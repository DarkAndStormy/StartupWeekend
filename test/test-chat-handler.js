(function () {
	'use strict';

	var buster = require('buster'),
		sinon = require('sinon'),
		chatHandler = require('../lib/chat-handler'),
		sockets = {
			emit: sinon.spy(),
			broadcast: {
				emit: sinon.spy()
			}
		};

	buster.testCase('ChatHandler', {

		'on connection, we emit an event telling the browser it connected successfully': function () {
			chatHandler.onConnection(sockets);

			assert.called(sockets.emit);
			assert.equals(sockets.emit.args[0][0], 'status');
			assert.equals(sockets.emit.args[0][1], 'connected');
		},

		'// on connection we start listening for messages': function () {

		}

	});

}());