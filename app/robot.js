var SerialPort = require('serialport');

module.exports = function(io, port) {
    var numberOfPins = 4;
    var port = new SerialPort(port, {
        baudRate: 57600
    });

    port.on('open', () => {
        port.on('data', buffer => {
            var data = Array.from(buffer);
            var byte = data[0];
            var mod = 0;
            var pins = [];
            
            for(var i = 0; i < numberOfPins; i++) {
                mod = byte % 2;
                byte = Math.floor(byte / 2);

                pins.push(mod == 1? true : false);
            }

            io.emit('notesPlayed', pins);
        });
    });
}
