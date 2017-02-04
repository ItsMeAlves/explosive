var board = document.querySelector('#availableDevices #buttons');

socket.on('availablePorts', ports => {

    ports.forEach(port => {
        var button = document.createElement('BUTTON');
        button.textContent = port.comName;
        button.className = "waves-effect waves-light btn modal-close red"
        button.onclick = function() {
            socket.emit('selectedPort', port.comName);
            document.querySelector('#title').textContent = "Explosive";
            document.querySelector('#subtitle').textContent = "Conectado" +
                " atualmente ao dispositivo " + port.comName +
                ". Tom base: 523Hz";
        }

        board.appendChild(button);
    });

    $('#availableDevices').modal('open');
});