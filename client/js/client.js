(function ($, global) {

	global.darkAndStormy = {
		init: function() {
			var socket = io.connect('/');

			socket.on('message', function (data) {
				$('#messages').append('<li>' + data + '</li>');
			});

            $('form').on('submit', function () {
                $('#messages').append('<li></li>');
            })
		}
	};

}(jQuery, this));