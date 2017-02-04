var states = [false, false, false, false];
var boxes = ["box1", "box2", "box3", "box4"];

socket.on('notesPlayed', notes => {
    notes.forEach((note, index) => {
        if(note && !states[index]) {
            oscillators[index].start();
            states[index] = true;

            var box = document.querySelector(".firebox." + boxes[index]);
            box.className = "firebox " + boxes[index];
        }
        else if(!note && states[index]) {
            var freq = oscillators[index].frequency.value;

            oscillators[index].stop();
            states[index] = false;

            oscillators[index].disconnect();
            oscillators[index] = audio.createOscillator();
            oscillators[index].type = 'sine';
            oscillators[index].frequency.value = freq;
            oscillators[index].connect(audio.destination);

            var box = document.querySelector(".firebox." + boxes[index]);
            box.className = "firebox " + boxes[index] + " grayscale";
        }
    });
});