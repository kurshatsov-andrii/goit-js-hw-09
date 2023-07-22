//Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body>
// на випадкове значення, використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору
// фону повинна зупинятися.
//Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
//Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною(disabled).
const links = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};

links.startButton.addEventListener('click', onStartButtonClick);
links.stopButton.addEventListener('click', onStopButtonClick);

//змінна ID таймеру
let timerID = 0;

//запускаємо функцію, де кнопка Stop не активна спочатку
setButtonDisabled(links.stopButton);

//натискання кнопки Start
function onStartButtonClick() {
  timerID = setInterval(bodyBackgroundColor, 1000);
  setButtonDisabled(links.startButton);
  setButtonActive(links.stopButton);
}

//натискання кнопки Stop
function onStopButtonClick() {
  clearInterval(timerID);
  timerID = 0;
  setButtonActive(links.startButton);
  setButtonDisabled(links.stopButton);
}

//Міняємо фон body
function bodyBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

//кнопка не активна
function setButtonDisabled(btn) {
  btn.setAttribute('disabled', '');
}

//кнопка активна
function setButtonActive(btn) {
  btn.removeAttribute('disabled');
}

//Для генерування випадкового кольору використовуємо функцію getRandomHexColor
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
