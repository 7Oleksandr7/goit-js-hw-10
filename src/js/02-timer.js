import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const datetimeEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('button[data-start]');
const spanDaysEl = document.querySelector('span[data-days]');
const spanHoursEl = document.querySelector('span[data-hours]');
const spanMinutesEl = document.querySelector('span[data-minutes]');
const spanSecondsEl = document.querySelector('span[data-seconds]');

let timerId = null;

startBtnEl.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - new Date() < 0) {
      startBtnEl.setAttribute('disabled', true);
      Notify.failure('Please choose a date in the future');
      return;
    }
    startBtnEl.removeAttribute('disabled');
    startBtnEl.addEventListener('click', () => {
      timerId = setInterval(() => {
        const timerTime = convertMs(selectedDates[0] - new Date());
        const { days, hours, minutes, seconds } = timerTime;
        if (days + hours + minutes + seconds === 0) {
          clearInterval(timerId);
        }
        spanDaysEl.textContent = addLeadingZero(days);
        spanHoursEl.textContent = addLeadingZero(hours);
        spanMinutesEl.textContent = addLeadingZero(minutes);
        spanSecondsEl.textContent = addLeadingZero(seconds);
      }, 1000);
    });
  },
};

flatpickr(datetimeEl, options);

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
  return String(value).padStart(2, '0');
}
