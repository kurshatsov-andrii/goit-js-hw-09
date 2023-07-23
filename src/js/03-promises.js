//Для відображення повідомлень користувачеві, замість console.log(),
//використовуй бібліотеку notiflix.
import Notiflix from 'notiflix';

//Initialize the Notify Module with some options
Notiflix.Notify.init({
  width: '280px',
  position: 'center-center',
  distance: '10px',
  opacity: 1,
  clickToClose: true,
});

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  document.querySelector('button').disabled = true;

  const initialDelay = Number(event.target.elements.delay.value);
  const step = Number(event.target.elements.step.value);
  const amount = Number(event.target.elements.amount.value);
  //Треба вибрати amount > 0
  if (amount <= 0) {
    event.target.reset();
    Notiflix.Notify.failure('Please choose amount > 0');
    document.querySelector('button').disabled = false;
    return;
  }

  let delay = initialDelay;

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
  setTimeout(() => {
    document.querySelector('button').disabled = false;
  }, delay);
}

//Напиши скрипт, який на момент сабміту форми викликає функцію
//createPromise(position, delay) стільки разів, скільки ввели в поле amount.
//Під час кожного виклику передай їй номер промісу(position), що створюється, і затримку,
//враховуючи першу затримку(delay), введену користувачем, і крок(step).
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}
