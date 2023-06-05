import Notiflix from 'notiflix';

const form = document.querySelector('.form')
const firstDelayInput = document.querySelector('[name="delay"]')
const delayStepInput = document.querySelector('[name="step"]')
const amountElInput = document.querySelector('[name="amount"]')


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}



const onPromiseBtn = (event) => {
  event.preventDefault()

  const delay = Number(firstDelayInput.value);
  const step = Number(delayStepInput.value);
  const amount = Number(amountElInput.value);

  for (let i = 0; i < amount; i += 1) {
    const position = i + 1 ;
    const promiseDelay = delay + i * step;
     
    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }

}

form.addEventListener('submit', onPromiseBtn)

