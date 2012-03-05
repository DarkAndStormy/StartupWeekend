(function () {
    'use strict';

	var buster = require('buster'),
		sinon = require('sinon'),
		chatHandler = require('../../lib/chat-handler'),
        common = require('../bootstrap.js'),
		socket;

    function getOnMessageFunctionFromOnConnection() {
        chatHandler.onConnection(socket);
        return socket.on.args[0][1];
    }

    buster.testCase('ChatHandler', {

        setUp: function () {
            socket = {
                on: sinon.spy(),
                emit: sinon.spy(),
                broadcast: {
                    emit: sinon.spy()
                },
                handshake: {
                    session: {
                        user: null
                    }
                }
            };
        },

        '// report bugs to mocks': function () {
            // loadFile does not have the same relative paths as require
            // IIFE doesn't work in production code when using loadFile
        },

        'on connection, we emit an event telling the browser it connected successfully': function () {
            chatHandler.onConnection(socket);

			assert.equals(socket.emit.args[0][0], 'status');
			assert.equals(socket.emit.args[0][1], 'connected');
		},

        'on connection, we broadcast a message telling everyone we have arrived': function () {
            socket.handshake.session.user = common.anyString();

            chatHandler.onConnection(socket);

            assert.equals(socket.broadcast.emit.args[0][0], 'peer-connection');
            assert.equals(socket.broadcast.emit.args[0][1], socket.handshake.session.user);
        },

        'we start listening for messages': function () {
            chatHandler.onConnection(socket);

            assert.called(socket.on);
            assert.equals(socket.on.args[0][0], 'message');
            assert.isFunction(socket.on.args[0][1]);
        },

		'onMessage emits message as a broadcast': function () {
			var data = {key: common.anyString()},
                onMessage = getOnMessageFunctionFromOnConnection();

            socket.broadcast.emit.reset();
            onMessage.call(socket, data);

			assert.equals(socket.broadcast.emit.args[0][0], 'message');
			assert.equals(socket.broadcast.emit.args[0][1].message, data);
		},

        'onMessage emits session user as part of broadcast': function () {
            var data = {},
                onMessage = getOnMessageFunctionFromOnConnection();

            socket.broadcast.emit.reset();
            socket.handshake.session.user = common.anyString();
            onMessage.call(socket, data);

            assert.equals(socket.broadcast.emit.args[0][1].user, socket.handshake.session.user);
        }

    });

}());