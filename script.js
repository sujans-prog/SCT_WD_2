let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById("display");
const laps = document.getElementById("laps");
const progressCircle = document.getElementById("progress");
const circleLength = 690; 
progressCircle.style.strokeDasharray = circleLength;
progressCircle.style.strokeDashoffset = circleLength; 

function start() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateTime, 100);
    running = true;
  }
}

function stop() {
  clearInterval(tInterval);
  running = false;
}

function reset() {
  clearInterval(tInterval);
  running = false;
  display.textContent = "00:00:00";
  difference = 0;
  lapCounter = 1;
  laps.innerHTML = "";

  progressCircle.style.strokeDashoffset = circleLength;
}

function lap() {
  if (running) {
    let li = document.createElement("li");
    li.textContent = `Lap ${lapCounter++}: ${display.textContent}`;
    laps.appendChild(li);
  }
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);

  display.textContent =
    (hours < 10 ? "0" : "") + hours + ":" +
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds;

  // Animate circle (1 minute cycle)
  let secFraction = (difference % 60000) / 60000; // fraction of current minute
  let offset = circleLength - (circleLength * secFraction);
  progressCircle.style.strokeDashoffset = offset;
}

document.getElementById("startBtn").addEventListener("click", start);
document.getElementById("stopBtn").addEventListener("click", stop);
document.getElementById("resetBtn").addEventListener("click", reset);
document.getElementById("lapBtn").addEventListener("click", lap);
