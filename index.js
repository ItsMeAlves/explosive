var app = require('./config/express');
var http = require('http').Server(app);
var websockets = require('./config/websockets');
var routes = require('./app/routes');
var robot = require('./app/robot');
var io = websockets(http);

routes(app, io);

io.use((socket, next) => {
    socket.on('selectedPort', value => {
        robot(io, value);
    });

    next();
});


http.listen(app.get('PORT'), () => {
    console.log('listening on', app.get('PORT'));
});