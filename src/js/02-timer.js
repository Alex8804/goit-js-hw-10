import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'center-top',
});

const startBtn = document.querySelector('button[data-start]');
const currentDate = new Date();

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= currentDate.getTime()) {
      Notiflix.Notify.info('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', onStartBtnClick);
    }
  },
};
const fp = flatpickr('#datetime-picker', options);

const elements = {
  day: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  input: document.querySelector('#datetime-picker'),
};

function onStartBtnClick() {
  const timerId = setInterval(() => {
    const currentTime = new Date();
    const ms = fp.selectedDates[0].getTime() - currentTime.getTime();

    elements.day.textContent = addLeadingZero(convertMs(ms).days);
    elements.hours.textContent = addLeadingZero(convertMs(ms).hours);
    elements.minutes.textContent = addLeadingZero(convertMs(ms).minutes);
    elements.seconds.textContent = addLeadingZero(convertMs(ms).seconds);

    elements.input.disabled = true;

    if (ms < 1000) {
      clearInterval(timerId);
      elements.input.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
