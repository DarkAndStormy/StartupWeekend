module.exports = {

	onConnection: function (socket) {
		socket.emit('status', 'connected');
		socket.on('message', function (data) {
			this.broadcast.emit('message', data);
		});
	}
};