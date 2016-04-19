'use strict';

module.exports = {
  serverURL: 'http://localhost:8080',
  serverPort: 8080,
  serverHost: 'localhost',
  applicationId: 'baker',
  masterKey: '70c6093dba5a7e55968a1c7ad3dd3e5a74ef5cac',
  fileKey: 'f33fc1a9-9ba9-4589-95ca-9976c0d52cd5',
  databaseURI: 'mongodb://localhost:27017/baker',
  isDevelopment: process.env.NODE_ENV !== 'production',
  users: [
    {
      user:'admin',
      pass:'admin'
    }
  ]
};
