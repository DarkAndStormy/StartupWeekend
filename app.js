var connect = require('connect')
  , app = require('express').createServer(connect.static(__dirname))
  , io = require('socket.io').listen(app)
  , chatHandler = require('./lib/chat-handler');

app.listen(8000);

io.sockets.on('connection', chatHandler.onConnection);