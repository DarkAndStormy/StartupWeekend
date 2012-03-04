var connect = require('connect')
  , express = require('express')
  , sessionStore = new express.session.MemoryStore()
  , app = express.createServer(
        connect.cookieParser('secret'),
        connect.session({
            secret: 'secret',
            key: 'express.sid',
            store: sessionStore
        }),
        connect.basicAuth(function(user, pass) {
            return true;
        }, 'dark and stormy'),
        function (req, res, next) {
            req.session.user = req.user;
            next();
        },
        connect.static(__dirname)
    )
  , io = require('socket.io').listen(app)
  , chatHandler = require('./lib/chat-handler');

app.listen(8000);

io.sockets.on('connection', chatHandler.onConnection);
io.set('authorization', function (data, accept) {
    if (data.headers.cookie) {
        data.cookie = connect.utils.parseCookie(data.headers.cookie);
        data.sessionId = data.cookie['express.sid'];
console.log(data.sessionId);
console.log(sessionStore);
        sessionStore.get(data.sessionId.split('.')[0], function (err, session) {
            if (err || !session) {
                console.log(session);
                accept('error message', false);
            } else {
                data.session = session;
                accept(null, true);
            }
        });
    } else {
        return accept('no cookie', false);
    }
});
