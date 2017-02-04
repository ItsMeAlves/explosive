var websockets = require('socket.io');

module.exports = function(http) {
    var io = websockets(http);

    io.on('connection', socket => {
        console.log('connection!');
    });

    return io;
}