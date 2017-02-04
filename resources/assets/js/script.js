var socket = io();

socket.on('boardStatus', status => {
    console.log('status');
    console.log(status);
});