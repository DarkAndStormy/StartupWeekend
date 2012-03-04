(function (global) {
	'use strict';

	global.io = {
		connect: function () {}
	};

	var socket = {
			on: function () {}
		},
		markup = '<ol id="messages">'
		+ '<form><input type="text" name="input" id="input"/></form>'
		+ '</ol>';

	buster.testCase('Client Tests', {

		setUp: function () {
			$('body').html(markup);

			sinon.stub(io, 'connect', function () {
				return socket;
			});

			sinon.spy(socket, 'on');
		},

		tearDown: function () {
			io.connect.restore();
			socket.on.restore();
		},

		'darkAndStormy namespace exists': function () {
			assert.isObject(darkAndStormy);
		},

		'test we connect to the server': function () {
			darkAndStormy.init();

			assert.called(io.connect);
			assert.equals(io.connect.args[0][0], '/');
		},

		'we subscribe to messages': function () {
			darkAndStormy.init();

			assert.called(socket.on);
			assert.equals(socket.on.args[0][0], 'message');
			assert.isFunction(socket.on.args[0][1]);
		},

		'onMessage adds the new message to the page': function () {
			darkAndStormy.init();
			var onMessage = socket.on.args[0][1];

			onMessage.call(socket, 'some data');

			assert.equals($('#messages li').length, 1);
			assert.equals($('#messages li').eq(0).html(), 'some data');
		},

		'submitting a message adds it to the DOM': function () {
			var text = 'some text',
				$input = $('#input'),
                preventSpy = sinon.spy();

			darkAndStormy.init();

            var event = new jQuery.Event('submit', {
                preventDefault: preventSpy
            });

			$input.val(text);
			$input.parent().trigger(event);

			assert.equals($('#messages li').length, 1);
            assert.equals($('#messages li').eq(0).text(), text);
            assert.calledOnce(preventSpy);
		}
	});

}(this));
