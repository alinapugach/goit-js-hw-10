'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let intervalId = null;
let userSelectedDate;
let currentDate;
const inputDate = document.getElementsByTagName('input')[0];
const btnStart = document.getElementsByTagName('button')[0];
const timer = document.querySelector('.timer');
const timerDay = timer.querySelector('[data-days]');
const timerHour = timer.querySelector('[data-hours]');
const timerMinute = timer.querySelector('[data-minutes]');
const timerSecond = timer.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentDate = new Date();
    if (selectedDates[0] < currentDate) {
      btnStart.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Illegal operation',
      });
    } else {
      btnStart.disabled = false;
    }
    userSelectedDate = selectedDates[0];
  },
};

btnStart.addEventListener('click', () => {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    console.log(currentTime);
    const differentTime = userSelectedDate - currentTime;
    const timeObj = convertMs(differentTime);
    addLeadingZero(timeObj.days, timerDay);
    addLeadingZero(timeObj.hours, timerHour);
    addLeadingZero(timeObj.minutes, timerMinute);
    addLeadingZero(timeObj.seconds, timerSecond);
    btnStart.disabled = true;
    inputDate.disabled = true;
    if (differentTime < 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
});

function addLeadingZero(value, timerName) {
  timerName.textContent = value.toString().padStart(2, '0');
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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

flatpickr('#datetime-picker', options);
