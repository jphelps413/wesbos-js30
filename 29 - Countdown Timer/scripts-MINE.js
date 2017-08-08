
console.clear();
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearTimeout(countdown); // clear any that are already active

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  console.log(`Timeout ${seconds}`);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if( secondsLeft < 0 ) {
      clearInterval(countdown);
      console.log('*DING*');
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

// I normally would make this a lot more flexible, but not right now.
function leading0(n) {
  return (n < 10 ? `0${n}` : `${n}`);
}

function displayTimeLeft(seconds) {
  const dispMinutes = Math.floor(seconds / 60);
  const dispSeconds = seconds % 60;
  const dispTime = `${dispMinutes}:${leading0(dispSeconds)}`;
  timerDisplay.textContent = dispTime;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  let hour = end.getHours();
  hour -= (hour > 12 ? 12 : 0); // Can't use % else midnight to one would 0
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hour}:${leading0(minutes)}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer( seconds );
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  timer( this.minutes.value * 60 );
  this.reset();
});
