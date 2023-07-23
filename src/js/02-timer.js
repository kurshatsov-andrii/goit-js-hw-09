//Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.
//Такий таймер може використовуватися у блогах та інтернет - магазинах,
//сторінках реєстрації подій, під час технічного обслуговування тощо.
//Використовуй бібліотеку flatpickr для того, щоб дозволити користувачеві кросбраузерно
//вибрати кінцеву дату і час в одному елементі інтерфейсу.

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const links = {
  startButton: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  dataTime: document.querySelector('input'),
};

let selectDate = '';

//запускаємо функцію, де кнопка Start не активна спочатку
setButtonDisabled(links.startButton);

//Initialize the Notify Module with some options
Notiflix.Notify.init({
  width: '280px',
  position: 'center-center',
  distance: '10px',
  opacity: 1,
  clickToClose: true,
});

//Другим аргументом функції flatpickr(selector, options) можна передати необов'язковий об'єкт
//параметрів.
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectDate = selectedDates[0];
    console.log(selectDate);
    //Треба вибрати майбутню дату
    if (selectDate < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      setButtonDisabled(links.startButton);
    } else {
      setButtonActive(links.startButton);
    }
  },
};

flatpickr('#datetime-picker', options);

links.startButton.addEventListener('click', onStartButtonClick);

//Старт таймеру
function onStartButtonClick() {
  setButtonDisabled(links.startButton);
  links.dataTime.disabled = true;

  const timerID = setInterval(() => {
    let ms = selectDate - Date.now();
    let timeLeft = convertMs(ms);

    links.days.textContent = addLeadingZero(timeLeft.days);
    links.hours.textContent = addLeadingZero(timeLeft.hours);
    links.minutes.textContent = addLeadingZero(timeLeft.minutes);
    links.seconds.textContent = addLeadingZero(timeLeft.seconds);
    //Таймер зупиняється, коли дійшов до кінцевої дати, тобто 00:00:00:00
    if (ms < 1000) {
      clearInterval(timerID);
      Notiflix.Notify.success('Time is over');
      links.dataTime.disabled = false;
    }
  }, 1000);
}

//кнопка не активна
function setButtonDisabled(btn) {
  btn.setAttribute('disabled', '');
}

//кнопка активна
function setButtonActive(btn) {
  btn.removeAttribute('disabled');
}

//Для підрахунку значень використовуй готову функцію convertMs,
//де ms - різниця між кінцевою і поточною датою в мілісекундах.
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

//Додаємо 0 спереду, якщо цифра одна
function addLeadingZero(value) {
  return (value = value.toString().padStart(2, '0'));
}
