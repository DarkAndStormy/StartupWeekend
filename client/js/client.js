(function ($, global) {

	global.darkAndStormy = {
		init: function() {
			var socket = io.connect('/');

			socket.on('message', function (data) {
				$('#messages').append('<li>' + data + '</li>');
			});

            $('form').on('submit', function (event) {
                event.preventDefault();

                var $input = $('#input'),
                    message = $input.val();

                $('#messages').append('<li>' + message + '</li>');
                socket.emit('message', message);
                $input.val('');
            });


		}
	};

    if (global.io) {
        darkAndStormy.init();
    }

}(jQuery, this));