var five = require('johnny-five');

module.exports = function(io) {
    var board = new five.Board();

    board.on('ready', () => {
        io.emit('boardStatus', {
            status: 'ready'
        });
    });
}
