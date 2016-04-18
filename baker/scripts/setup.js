#!/usr/bin/env node

var path = require('path');

var CLI_MODULE_PATH = function() {
	return path.resolve(
		process.cwd(),
		'node_modules',
		'react-native',
		'cli.js'
	);
};

var cli = require(CLI_MODULE_PATH());
cli.init(process.cwd(), 'HelloReact');
