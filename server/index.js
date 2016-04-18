var path = require('path');
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');

var app = express();


var SERVER_PORT = process.env.PORT || 8080;
var SERVER_HOST = process.env.HOST || 'localhost';
var APP_ID = process.env.APP_ID || 'oss-f8-app-2016';
var MASTER_KEY = process.env.MASTER_KEY || '70c6093dba5a7e55968a1c7ad3dd3e5a74ef5cac';
var DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/dev';
var IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';




app.use( '/parse', new ParseServer({
  databaseURI: DATABASE_URI,
  cloud: path.resolve(__dirname, 'cloud.js'),
  appId: APP_ID,
  masterKey: MASTER_KEY,
  fileKey: 'f33fc1a9-9ba9-4589-95ca-9976c0d52cd5',
  serverURL: `http://${SERVER_HOST}:${SERVER_PORT}/parse`,
}));

app.use('/dashboard', ParseDashboard({
  apps: [{
    serverURL: '/parse',
    appId: APP_ID,
    masterKey: MASTER_KEY,
    appName: 'F8-App-2016',
  }],
  users: [
    {
      user:'admin',
      pass:'admin'
    }
  ]
}, IS_DEVELOPMENT));


// var api = new ParseServer({
//   databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
//   cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
//   appId: 'myAppId',
//   masterKey: 'myMasterKey', // Keep this key secret!
//   fileKey: 'optionalFileKey',
//   serverURL: 'http://localhost:1337/parse' // Don't forget to change to https if needed
// });

// // Serve the Parse API on the /parse URL prefix
// app.use('/parse', api);

app.listen(SERVER_PORT, function() {
  console.log('parse-server-example running on port', SERVER_PORT);
});
