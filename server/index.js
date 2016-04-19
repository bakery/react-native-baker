var path = require('path');
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var env = require('../env');

var app = express();

app.use( '/parse', new ParseServer({
  databaseURI: env.databaseURI,
  cloud: path.resolve(__dirname, 'cloud.js'),
  appId: env.applicationId,
  masterKey: env.masterKey,
  fileKey: env.fileKey,
  serverURL: `${env.serverURL}/parse`,
}));

app.use('/dashboard', ParseDashboard({
  apps: [{
    serverURL: '/parse',
    appId: env.applicationId,
    masterKey: env.masterKey,
    appName: env.applicationId,
  }],
  users: env.users,
}, env.isDevelopment));


app.listen(env.serverPort, function() {
  console.log('parse-server-example running on port', env.serverPort);
});
