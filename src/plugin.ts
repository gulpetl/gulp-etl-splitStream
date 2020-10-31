import PluginError = require('plugin-error');
import Vinyl = require('vinyl')
import { Transform } from 'stream';
const through2 = require('through2')
const split = require('split2')
const select = require('JSONSelect');

// consts
const PLUGIN_NAME = 'gulp-etl-splitfile';

export type TransformCallback = (lineObj: Object) => Object | null

/* This is a model gulp-etl plugin. It is compliant with best practices for Gulp plugins (see
https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md#what-does-a-good-plugin-look-like ),
but with an additional feature: it accepts a configObj as its first parameter */
export function splitFile(configObj: any) {
  let returnErr: any = null

  let index: number = configObj.index ? configObj.index : null;
  let separator: string = configObj.separator ? configObj.separator : "_";
  let timeStamp: string = configObj.timeStamp ? configObj.timeStamp : false;

  let groupFields: Array<string> = []
  let groupFiles: any = {}

  if (configObj.groupBy) {
    if (Array.isArray(configObj.groupBy)){
      // groupFields.forEach( function () {})
      // groupFields.forEach( () => {})
      configObj.groupBy.forEach( (grpStr:string) => {groupFields.push(grpStr)})
    }
    else if (typeof configObj.groupBy === "string")
      groupFields.push(configObj.groupBy)

    if (index)
      // can't use index and groupBy together
      returnErr = new PluginError(PLUGIN_NAME, "can't use index and groupBy together")

  }
  else if (!index) index = 1; // default index to 1 if there is nothing else to do; we'll split each line to its own file

  // creating a stream through which each file will pass
  // see https://stackoverflow.com/a/52432089/5578474 for a note on the "this" param
  const strm = through2.obj(function (this: any, file: Vinyl, encoding: string, cb: Function) {
    const self = this

    let count: number = 0;
    let filecount: number = 0;
    let currentfile: Vinyl;

    function getGroupFileToUse(line: string): Vinyl {
      let lineValue: string = "";
      let lineObj = JSON.parse(line);

      groupFields.forEach(fld => {
        if (lineValue != "")
          lineValue += separator
        try {
          lineValue += select.match(fld, lineObj)
        }
        catch (err) {
          lineValue = "unknown"
        }
      });

      if (!groupFiles[lineValue]) {
        // initiate new file
        let newPath = file.stem
        if (timeStamp) 
          newPath += separator + getDateStamp()
        newPath += separator + lineValue + '.ndjson'
  
        let newFile = new Vinyl({
          path: newPath,
          contents: through2.obj()
        })


        groupFiles[lineValue] = newFile
        self.push(newFile)
      }

      return groupFiles[lineValue]
    }

    function getNewIndexFileToUse(): Vinyl {
      let newPath = file.stem
      if (timeStamp) 
        newPath += separator + getDateStamp()
      newPath += separator + (filecount++) + '.ndjson'

      let currentfile = new Vinyl({
        path: newPath,
        contents: through2.obj()
      });
      self.push(currentfile);
      return currentfile;
    }

    function endIndexFile(): void {
      //https://nodejs.org/api/stream.html#stream_writable_end_chunk_encoding_callback
      //need to end writable streams, 'end' signals no more data will be written to the stream
      (currentfile.contents as Transform).end()
      count = 0;
    }

    function finalizeFiles(): void {
      if (Object.keys(groupFiles).length > 0) {
        for (const prop in groupFiles) {
          (groupFiles[prop].contents as unknown as Transform).end()
        }
      }
      else if (currentfile)
        (currentfile.contents as unknown as Transform).end()
    }

    function handleLine(line: string, buffer: boolean) {
      if (line.trim() != "") {
        if (!index)
          currentfile = getGroupFileToUse(line)
        else if (count == 0)
          currentfile = getNewIndexFileToUse()

        if (buffer)
          (currentfile.contents as Transform).push(Buffer.from(line + '\n'))
        else
          (currentfile.contents as Transform).push(line + '\n')

        count++
      }

      //if the number of lines in the current file is equal to the target index param, push file through
      if (count == index)
        endIndexFile()
    }


    if (file.isNull()) {
      // return empty file
      return cb(returnErr, file)
    }
    else if (file.isBuffer()) {
      // strArray will hold file.contents, split into lines
      try {
        const strArray = (file.contents as Buffer).toString().split(/\r?\n/)
        let i: number = 0;
        while (strArray.length > 0) {
          if (index && index < strArray.length) {
            i = index
          } else {
            i = strArray.length;
          }
          let contents: string = '';
          let subArr = strArray.slice(0, i);
          strArray.splice(0, i);
          subArr.forEach((item: any, index: any, array: any) => {
            handleLine(item, true)
          })
        }

        finalizeFiles()
      } catch (err) {
        returnErr = new PluginError(PLUGIN_NAME, err);
      }
      cb(returnErr)
      // cb(returnErr,file);// this returns the original file; we return only the split files
    }
    else if (file.isStream()) {

      file.contents
        // split plugin will split the file into lines
        .pipe(split())
        .on('data', function (line: string) {
          handleLine(line, false)
        })
        .on('end', function () {
          finalizeFiles()

          console.log('end');
          cb(returnErr);
          // cb(returnErr,file); // this returns the original file; we return only the split files
        })
        .on('error', function (err: any) {
          //console.error(err)
          cb(new PluginError(PLUGIN_NAME, err))
        })
    }

  })

  return strm
}

function getDateStamp() {
  const dt: Date = new Date()
  const dateStamp =
    Number(String(dt.getFullYear()).substr(2, 2))
      .toString(32)
      .padStart(2, '0') + // 2-digit year converted to base32
    (dt.getMonth() + 1).toString(32) + // month (1-12) converted to base32
    dt.getDate().toString(32) + // day (1-31) converted to base 32
    '_' +
    // hmmss, where h is in base32, but mmss is in normal base10 (base 10 for readability; we can't save any digits by using base32)
    dt.getHours().toString(32) +
    String(dt.getMinutes()).padStart(2, '0') +
    String(dt.getSeconds()).padStart(2, '0') +
    '_' +
    // milliseconds, in base32
    dt
      .getMilliseconds()
      .toString(32)
      .padStart(2, '0')
  return dateStamp;
}