const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

let time = 1500; // 25 minutes in seconds
let timerInterval;

function startTimer() {
	timerInterval = setInterval(() => {
		time--;
		updateDisplay();

		if (time === 0) {
			clearInterval(timerInterval);
			alert('Time is up!');
		}
	}, 1000);

	startButton.disabled = true;
	pauseButton.disabled = false;
}

function pauseTimer() {
	clearInterval(timerInterval);

	startButton.disabled = false;
	pauseButton.disabled = true;
}

function resetTimer() {
	clearInterval(timerInterval);
	time = 1500;
	updateDisplay();

	startButton.disabled = false;
	pauseButton.disabled = true;
}

function updateDisplay() {
	const minutes = Math.floor(time / 60).toString().padStart(2, '0');
	const seconds = (time % 60).toString().padStart(2, '0');
	timerDisplay.textContent = `${minutes}:${seconds}`;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
