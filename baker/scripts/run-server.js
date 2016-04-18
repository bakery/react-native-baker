require('shelljs/global');

var path = require('path');
var mongoDBRoot = path.resolve(process.cwd(), '.mongo/');
var mongoDBLockFile = path.resolve(mongoDBRoot, 'mongod.lock');
var mongoLogFile = '~/mongod.log';
var serverModule = path.resolve(process.cwd(), 'server/index.js');

function killMongoIfItsUp() {
  try {
    var pid = cat(mongoDBLockFile);
    if (pid) {
      process.kill(pid, 'SIGINT');
    }
  } catch (e) {
    console.error('Tried killing mongo but failed', e);
  }
}

function startMongo() {
  return exec([
    'mongod',
    '--dbpath', mongoDBRoot,
    '--fork', '--logpath', mongoLogFile
  ].join(' '));
}

function startServer() {
  return exec(['node', serverModule].join(' '));
}

function exitHandler(options, err) {
  // if (options.cleanup) console.log('clean');
  // if (err) console.log(err.stack);
  // if (options.exit) process.exit();
  console.error('@@@ exiting');
  killMongoIfItsUp();
}

//do something when app is closing
process.on('exit', exitHandler);

//catches ctrl+c event
process.on('SIGINT', exitHandler);

//catches uncaught exceptions
process.on('uncaughtException', exitHandler);

startMongo();
startServer();
