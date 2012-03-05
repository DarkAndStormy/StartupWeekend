(function (global) {
    'use strict';

    global.io = {
        connect: function () {}
    };

    var socket = {
            on: function () {},
            emit: function () {}
		},
        events,
		markup = '<ol id="messages">'
		+ '<form><input type="text" name="input" id="input"/></form>'
		+ '</ol>';

    buster.testCase('Client Tests', {

		setUp: function () {
            var test = this;
            events = {};

			$('body').html(markup);

            sinon.stub(io, 'connect', function () {
                return socket;
            });

			sinon.stub(socket, 'on', function (key, callback) {
                events[key] = callback;
            });

            darkAndStormy.init();
        },

        tearDown: function () {
            io.connect.restore();
            socket.on.restore();
        },

        'test we connect to the server': function () {
            assert.called(io.connect);
            assert.equals(io.connect.args[0][0], '/');
        },

		'we subscribe to messages': function () {
            assert.isFunction(common.getCallWithArgs(socket.on, ['message']).args[1]);
		},

        'onMessage adds the new message to the page': function () {
            var onMessage = socket.on.args[0][1];

            onMessage.call(socket, {message: 'some data', user: 'some user'});

            assert.equals($('#messages li').length, 1);
            var $message = $('#messages li').eq(0);
            assert.equals($message.html(), '<span class="user">some user</span> some data');
            assert($message.hasClass('peer'));
        },

        'submitting a message adds it to the DOM': function () {
            var text = 'some text',
                $input = $('#input');

            $input.val(text);
            $input.parent().submit();

            assert.equals($('#messages li').length, 1);
            var $message = $('#messages li').eq(0);
            assert.equals($message.html(), '<span class="user">Me</span> ' + text);
            assert($message.hasClass('self'));
        },

        'message form onSubmit prevents the default behavior': function () {
            var $input = $('#input'),
                preventSpy = sinon.spy();

            var event = new jQuery.Event('submit', {
                preventDefault: preventSpy
            });

            $input.parent().trigger(event);

            assert.calledOnce(preventSpy);
        },

        'inbox box is cleared on form submit': function () {
            var $input = $('#input');

            $input.val('some value');

            $input.parent().submit();

            assert.equals($input.val(), '');
        },

        'message sent to server upon submission': function () {
            var val = 'new message';

            sinon.spy(socket, 'emit');

            $('#input').val(val);
            $('form').submit();

            assert.calledOnce(socket.emit);
            assert.equals(socket.emit.args[0][0], 'message');
            assert.equals(socket.emit.args[0][1], val);
        },

        'we subscribe to peer-connection': function () {
            var call = common.getCallWithArgs(socket.on, ['peer-connection']);

            assert.isFunction(call.args[1]);
        },

        'the room is notified when someone joins': function () {
            var user = common.anyString();
            events['peer-connection'].call(socket, user);

            assert.equals($('#messages li').length, 1);
            assert.equals($('#messages li').eq(0).html(), '<span class="user peer">' + user + '</span> joined');
        }
    });

}(this));
