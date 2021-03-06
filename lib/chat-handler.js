var clock = require('./utils').clock;

module.exports = {


    onConnection: function (socket) {
        socket.emit('status', 'connected');

        socket.on('message', function (data) {
            this.broadcast.emit('message', {
                message: data,
                user: socket.handshake.session.user,
                timestamp: clock.getTime()
            });
        });

        socket.broadcast.emit('peer-connection', socket.handshake.session.user);
    }
};