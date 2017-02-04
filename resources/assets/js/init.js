var socket = io();
var audio = new AudioContext();
var oscillators = [];
var numberOfOscillators = 4;
var baseTone = 523;

for(var i = 0; i < numberOfOscillators; i++) {
    var oscillator = audio.createOscillator();

    oscillator.type = 'sine';
    oscillator.frequency.value = baseTone + (baseTone * i);
    oscillator.connect(audio.destination);

    oscillators.push(oscillator);
}

$(document).ready(function() {
    $('.modal').modal();
});