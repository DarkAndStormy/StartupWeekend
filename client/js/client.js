(function ($, global) {

    function addMessageToList(data) {
        var type = data.type || 'peer';
        $('#messages').append('<li class="' + type + '"><span class="user">' + data.user + '</span> ' + data.message + '</li>');
    }

    global.darkAndStormy = {
        init: function() {
            var socket = io.connect('/');

            socket.on('message', addMessageToList);

            $('form').on('submit', function (event) {
                event.preventDefault();

                var $input = $('#input'),
                    message = $input.val();

                addMessageToList({
                    message: message,
                    user: 'Me',
                    type: 'self'
                });
                socket.emit('message', message);
                $input.val('');
            });

            socket.on('peer-connection', function (user) {
                addMessageToList({
                    user: user,
                    message: 'joined'
                });
            });
        }
    };

    if (global.io) {
        darkAndStormy.init();
    }

}(jQuery, this));