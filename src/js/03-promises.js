import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onBtnCreatePrClick);

function onBtnCreatePrClick(evt) {
  evt.preventDefault();

  const {
    elements: { delay, step, amount },
  } = evt.currentTarget;

  let selectedDelay = Number(delay.value);
  const selectedStep = Number(step.value);
  const selectedAmount = Number(amount.value);

  for (let i = 1; i <= selectedAmount; i += 1) {
    createPromise(i, selectedDelay);
    selectedDelay += selectedStep;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, rejekt) => {
    const shouldResolve = Math.random() > 0.3;
    const timerId = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        rejekt({ position, delay });
      }
    }, delay);
  });
  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
