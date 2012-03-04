(function () {
	'use strict';

	var mocks = require('mocks'),
		buster = require('buster'),
		sinon = require('sinon'),
		chatHandler = require('../lib/chat-handler'),
		socket,
		chatHandler,
		chant;

	buster.testCase('ChatHandler', {

		setUp: function () {
			socket = {
				on: sinon.spy(),
				emit: sinon.spy(),
				broadcast: {
					emit: sinon.spy()
				}
			};
		},

		'// report bugs to mocks': function () {
			// loadFile does not have the same relative paths as require
			// IIFE doesn't work in production code when using loadFile
		},

		'on connection, we emit an event telling the browser it connected successfully': function () {
			chatHandler.onConnection(socket);

			assert.called(socket.emit);
			assert.equals(socket.emit.args[0][0], 'status');
			assert.equals(socket.emit.args[0][1], 'connected');
		},

		'we start listening for messages': function () {
			chatHandler.onConnection(socket);

			assert.called(socket.on);
			assert.equals(socket.on.args[0][0], 'message');
			assert.isFunction(socket.on.args[0][1]);
		},

		'onMessage emits message as a broadcast': function () {
			var data = {};
			chatHandler.onConnection(socket);

			socket.on.args[0][1].call(socket, data);

			assert.called(socket.broadcast.emit);
			assert.equals(socket.broadcast.emit.args[0][0], 'message');
			assert.equals(socket.broadcast.emit.args[0][1], data);
		},

	});

}());