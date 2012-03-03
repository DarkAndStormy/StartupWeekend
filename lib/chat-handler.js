(function () {

	function onConnection (socket) {
		socket.emit('status', 'connected');
	}

	module.exports = {
		onConnection: onConnection
	};

}());