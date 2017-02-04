var websockets = require('socket.io');
var SerialPort = require('serialport');

module.exports = function(http) {
    var io = websockets(http);

    io.on('connection', socket => {
        console.log('connection!');

        SerialPort.list((err, ports) => {
            socket.emit('availablePorts', ports);
        });

    });

    return io;
}