import * as handler from './handler';

let event = { resource: '/doparse',
path: '/doparse',
httpMethod: 'POST',
headers: 
{ Accept: '*/*',
'Accept-Encoding': 'gzip, deflate',
'cache-control': 'no-cache',
'CloudFront-Forwarded-Proto': 'https',
'CloudFront-Is-Desktop-Viewer': 'true',
'CloudFront-Is-Mobile-Viewer': 'false',
'CloudFront-Is-SmartTV-Viewer': 'false',
'CloudFront-Is-Tablet-Viewer': 'false',
'CloudFront-Viewer-Country': 'US',
'Content-Type': 'application/json',
Host: 'x6i61wo8pb.execute-api.us-west-2.amazonaws.com',
'Postman-Token': '1d8e3495-84a6-4575-854f-9bc8f40d58f7',
'User-Agent': 'PostmanRuntime/7.6.0',
Via: '1.1 fbeb3c11f48a12ec445d87ae00692840.cloudfront.net (CloudFront)',
'X-Amz-Cf-Id': 'yQ90zBu1OTHH0Ns8aVP68GngcZDkVrj_thZZH1pnAvRgLg9DnhBc1w==',
'X-Amzn-Trace-Id': 'Root=1-5c4cd202-e3664d7c94c2a6bc64e96c0c',
'X-Forwarded-For': '65.182.85.9, 70.132.9.111',
'X-Forwarded-Port': '443',
'X-Forwarded-Proto': 'https' },
multiValueHeaders: 
{ Accept: [ '*/*' ],
'Accept-Encoding': [ 'gzip, deflate' ],
'cache-control': [ 'no-cache' ],
'CloudFront-Forwarded-Proto': [ 'https' ],
'CloudFront-Is-Desktop-Viewer': [ 'true' ],
'CloudFront-Is-Mobile-Viewer': [ 'false' ],
'CloudFront-Is-SmartTV-Viewer': [ 'false' ],
'CloudFront-Is-Tablet-Viewer': [ 'false' ],
'CloudFront-Viewer-Country': [ 'US' ],
'Content-Type': [ 'application/json' ],
Host: [ 'x6i61wo8pb.execute-api.us-west-2.amazonaws.com' ],
'Postman-Token': [ '1d8e3495-84a6-4575-854f-9bc8f40d58f7' ],
'User-Agent': [ 'PostmanRuntime/7.6.0' ],
Via: 
[ '1.1 fbeb3c11f48a12ec445d87ae00692840.cloudfront.net (CloudFront)' ],
'X-Amz-Cf-Id': [ 'yQ90zBu1OTHH0Ns8aVP68GngcZDkVrj_thZZH1pnAvRgLg9DnhBc1w==' ],
'X-Amzn-Trace-Id': [ 'Root=1-5c4cd202-e3664d7c94c2a6bc64e96c0c' ],
'X-Forwarded-For': [ '65.182.85.9, 70.132.9.111' ],
'X-Forwarded-Port': [ '443' ],
'X-Forwarded-Proto': [ 'https' ] },
queryStringParameters: null,
multiValueQueryStringParameters: null,
pathParameters: null,
stageVariables: null,
requestContext: 
{ resourceId: 'g6uugu',
resourcePath: '/doparse',
httpMethod: 'POST',
extendedRequestId: 'UIXAUFrYPHcFlfg=',
requestTime: '26/Jan/2019:21:32:50 +0000',
path: '/dev/doparse',
accountId: '943224623824',
protocol: 'HTTP/1.1',
stage: 'dev',
domainPrefix: 'x6i61wo8pb',
requestTimeEpoch: 1548538370012,
requestId: 'ee2941e2-21b1-11e9-b245-27e2839fbfdb',
identity: 
{ cognitoIdentityPoolId: null,
accountId: null,
cognitoIdentityId: null,
caller: null,
sourceIp: '65.182.85.9',
accessKey: null,
cognitoAuthenticationType: null,
cognitoAuthenticationProvider: null,
userArn: null,
userAgent: 'PostmanRuntime/7.6.0',
user: null },
domainName: 'x6i61wo8pb.execute-api.us-west-2.amazonaws.com',
apiId: 'x6i61wo8pb' },
body: '{\n\t"config":{\n\t\t"index":2\n\t},\n\t"toParse": "{\\"type\\":\\"STATE\\",\\"value\\":{\\"envelope\\":{\\"to\\":[],\\"cc\\":[],\\"from\\":[],\\"bcc\\":[]},\\"tap_log\\":[{\\"tap_name\\":\\"parseFlat\\",\\"result\\":{\\"linesRead\\":{\\"USDA_Class\\":3}}}],\\"errors\\":[]} }\\r\\n{\\"type\\":\\"RECORD\\",\\"stream\\":\\"Bale\\",\\"record\\":{\\"Gin Code Number\\":60115,\\"Gin Bale Number\\":1119458,\\"Date Classed\\":\\"2015-09-03T00:00:00.000Z\\",\\"Module, Trailer, or Single Bale\\":0,\\"Module\\/Trailer Number\\":\\"00000\\",\\"Bales in Module\\/Trailer\\":0,\\"Official Color Grade\\":42,\\"Fiber Staple Length\\":37,\\"Micronaire\\":36,\\"Strength\\":317,\\"Leaf Grade\\":4,\\"Extraneous Matter\\":0,\\"Remarks\\":0,\\"Instrument ColorCode\\":42,\\"Color Quadrant\\":1,\\"Color Rd\\":733,\\"Color +b\\":91,\\"Non-Lint Content (Trash Percent Area)\\":8,\\"Length Uniformity Index (Percent)\\":820,\\"Upland or Pima\\":1,\\"Record Type\\":0,\\"Record Status\\":0,\\"CCC Loan Premiums and Discounts\\":\\"-0035\\"} }\\r\\n{\\"type\\":\\"RECORD\\",\\"stream\\":\\"Bale\\",\\"record\\":{\\"Gin Code Number\\":60115,\\"Gin Bale Number\\":1119463,\\"Date Classed\\":\\"2015-09-03T00:00:00.000Z\\",\\"Module, Trailer, or Single Bale\\":0,\\"Module\\/Trailer Number\\":\\"00000\\",\\"Bales in Module\\/Trailer\\":0,\\"Official Color Grade\\":42,\\"Fiber Staple Length\\":37,\\"Micronaire\\":34,\\"Strength\\":302,\\"Leaf Grade\\":5,\\"Extraneous Matter\\":0,\\"Remarks\\":0,\\"Instrument ColorCode\\":42,\\"Color Quadrant\\":1,\\"Color Rd\\":725,\\"Color +b\\":92,\\"Non-Lint Content (Trash Percent Area)\\":8,\\"Length Uniformity Index (Percent)\\":809,\\"Upland or Pima\\":1,\\"Record Type\\":0,\\"Record Status\\":0,\\"CCC Loan Premiums and Discounts\\":\\"-0425\\"} }\\r\\n{\\"type\\":\\"RECORD\\",\\"stream\\":\\"Bale\\",\\"record\\":{\\"Gin Code Number\\":60115,\\"Gin Bale Number\\":1119463,\\"Date Classed\\":\\"2015-09-03T00:00:00.000Z\\",\\"Module, Trailer, or Single Bale\\":0,\\"Module\\/Trailer Number\\":\\"00000\\",\\"Bales in Module\\/Trailer\\":0,\\"Official Color Grade\\":42,\\"Fiber Staple Length\\":37,\\"Micronaire\\":34,\\"Strength\\":302,\\"Leaf Grade\\":5,\\"Extraneous Matter\\":0,\\"Remarks\\":0,\\"Instrument ColorCode\\":42,\\"Color Quadrant\\":1,\\"Color Rd\\":725,\\"Color +b\\":92,\\"Non-Lint Content (Trash Percent Area)\\":8,\\"Length Uniformity Index (Percent)\\":809,\\"Upland or Pima\\":1,\\"Record Type\\":0,\\"Record Status\\":0,\\"CCC Loan Premiums and Discounts\\":\\"-0425\\"} }\\r\\n{\\"type\\":\\"RECORD\\",\\"stream\\":\\"Bale\\",\\"record\\":{\\"Gin Code Number\\":60115,\\"Gin Bale Number\\":1119463,\\"Date Classed\\":\\"2015-09-03T00:00:00.000Z\\",\\"Module, Trailer, or Single Bale\\":0,\\"Module\\/Trailer Number\\":\\"00000\\",\\"Bales in Module\\/Trailer\\":0,\\"Official Color Grade\\":42,\\"Fiber Staple Length\\":37,\\"Micronaire\\":34,\\"Strength\\":302,\\"Leaf Grade\\":5,\\"Extraneous Matter\\":0,\\"Remarks\\":0,\\"Instrument ColorCode\\":42,\\"Color Quadrant\\":1,\\"Color Rd\\":725,\\"Color +b\\":92,\\"Non-Lint Content (Trash Percent Area)\\":8,\\"Length Uniformity Index (Percent)\\":809,\\"Upland or Pima\\":1,\\"Record Type\\":0,\\"Record Status\\":0,\\"CCC Loan Premiums and Discounts\\":\\"-0425\\"} }\\r\\n{\\"type\\":\\"STATE\\",\\"value\\":{\\"envelope\\":{\\"to\\":[],\\"cc\\":[],\\"from\\":[],\\"bcc\\":[]},\\"tap_log\\":[{\\"tap_name\\":\\"parseFlat\\",\\"result\\":{\\"linesRead\\":{\\"USDA_Class\\":3}}}],\\"errors\\":[]} }"\n}',
isBase64Encoded: false }

//handler.doParse(event,null,()=>{});

import {splitStream} from '../plugin';
const from = require('from2');
const Vinyl = require('vinyl');

let fakeFile = new Vinyl({
    contents: from(['{"type":"STATE"}\n{"type":"RECORD"}\n{"type":"RECORD"}\n{"type":"RECORD"}'])
})


from.obj([fakeFile]).pipe(splitStream({}))
.once('data', function(file:any){
    
    //console.log("file: " + JSON.stringify(file))
    file.contents.on('data', function(chunk:any){
        console.log(chunk);
    })
})


