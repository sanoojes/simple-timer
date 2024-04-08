const timerDisplay = document.querySelector(".timer-display");
const [startButton, pauseButton, resetButton] = document.querySelectorAll(
    ".timer-start, .timer-pause, .timer-reset"
);

// Variables
let isPaused = true;
let isTimerRunning = false;
let interval;
let pauseDate = 0;
let elapsedTime = 0;
let countDownDate;

// Function to update the countDownDate
const updateCountDownDate = () => {
    countDownDate = Date.now();
};

// Function to update the timer display
const updateTimerDisplay = () => {
    let now = Date.now();
    let distance =
        now - countDownDate - (isPaused ? pauseDate : 0) + elapsedTime;

    let hours = Math.floor(distance / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerDisplay.textContent = `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
};

// Function to start the timer
const startTimer = () => {
    if (!isTimerRunning) {
        isTimerRunning = true;
        countDownDate = Date.now();
        interval = setInterval(updateTimerDisplay, 1000);
    }
};

// Function to pause the timer
const pauseTimer = () => {
    if (isTimerRunning) {
        let now = Date.now();
        elapsedTime += now - countDownDate - (isPaused ? pauseDate : 0);
        clearInterval(interval);
        isPaused = true;
        isTimerRunning = false;
    }
};

// Function to reset the timer
const resetTimer = () => {
    clearInterval(interval);
    isTimerRunning = false;
    isPaused = true;
    elapsedTime = 0;
    updateCountDownDate();
    updateTimerDisplay();
};

// Event listeners for buttons
startButton.addEventListener("click", () => {
    if (isPaused) {
        isPaused = false;
        startTimer();
    } else {
        alert("Pause the timer first!");
    }
});

pauseButton.addEventListener("click", () => {
    if (isTimerRunning) {
        pauseTimer();
    } else {
        alert("Timer is not running!");
    }
});

resetButton.addEventListener("click", resetTimer);

// Initializing timer display
updateCountDownDate();
updateTimerDisplay();
