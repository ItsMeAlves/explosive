var app = require('./config/express');
var http = require('http').Server(app);
var websockets = require('./config/websockets');
var routes = require('./app/routes');
var robot = require('./app/robot');
var io = websockets(http);

routes(app, io);
robot(io);

http.listen(app.get('PORT'), () => {
    console.log('listening on', app.get('PORT'));
});