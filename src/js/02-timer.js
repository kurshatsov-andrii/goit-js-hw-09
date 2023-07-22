//Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. Такий таймер може використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо.
//Використовуй бібліотеку flatpickr для того, щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу.

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const links = {
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let selectedDate = null;

makeBtnInactive(links.startBtn);

Notiflix.Notify.init({
  width: '280px',
  position: 'center-top',
  distance: '10px',
  opacity: 1,
});

//Другим аргументом функції flatpickr(selector, options) можна передати необов'язковий об'єкт параметрів. Ми підготували для тебе об'єкт, який потрібен для виконання завдання.
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDate < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      makeBtnInactive(links.startBtn);
    } else {
      makeBtnActive(links.startBtn);
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

links.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  makeBtnInactive(links.startBtn);

  const timerId = setInterval(() => {
    let ms = selectedDate - Date.now();
    let remainedTimeOdject = convertMs(ms);

    links.days.textContent = addLeadingZero(remainedTimeOdject.days);
    links.hours.textContent = addLeadingZero(remainedTimeOdject.hours);
    links.minutes.textContent = addLeadingZero(remainedTimeOdject.minutes);
    links.seconds.textContent = addLeadingZero(remainedTimeOdject.seconds);

    if (ms < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

function makeBtnInactive(btn) {
  btn.setAttribute('disabled', 'true');
}

function makeBtnActive(btn) {
  btn.removeAttribute('disabled');
}

//Для підрахунку значень використовуй готову функцію convertMs, де ms - різниця між кінцевою і поточною датою в мілісекундах.
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return (value = value.toString().padStart(2, '0'));
}
