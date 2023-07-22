//Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
//Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).
const links = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

links.startBtn.addEventListener('click', onStartBtnClick);
links.stopBtn.addEventListener('click', onStopBtnClick);

let timerId = null;

makeBtnInactive(links.stopBtn);

function onStartBtnClick(e) {
  timerId = setInterval(setBodyBgColor, 1000);

  makeBtnInactive(links.startBtn);

  makeBtnActive(links.stopBtn);
}

function onStopBtnClick() {
  clearInterval(timerId);

  makeBtnActive(links.startBtn);

  makeBtnInactive(links.stopBtn);
}

function setBodyBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function makeBtnActive(btn) {
  btn.removeAttribute('disabled');
}

function makeBtnInactive(btn) {
  btn.setAttribute('disabled', 'true');
}

//Для генерування випадкового кольору використовуй функцію getRandomHexColor
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
