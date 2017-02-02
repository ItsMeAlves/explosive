var robot = require('robotjs');
var btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
	console.log('will type');
	setTimeout(function() {
		robot.typeString('hue');
	}, 3000);
});