import Notiflix from 'notiflix';
Notiflix.Notify.init({
  position: 'center-top',
  opacity: 0.8,
  timeout: 2500,
  clickToClose: true,
});

const form = document.querySelector('.form');
const submitBtn = document.querySelector('.form button');

form.addEventListener('submit', runPromises);

function runPromises(e) {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  let promiseDelay = +delay.value;

  for (let i = 1; i <= +amount.value; i += 1) {
    createPromise(i, promiseDelay).then(onFullFilled).catch(onRejected);
    promiseDelay += +step.value;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    const obj = {
      position,
      delay,
    };

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(obj);
      }
      // Reject
      reject(obj);
    }, delay);
  });
  return promise;
}

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

function onFullFilled({ position, delay }) {
  Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onRejected({ position, delay }) {
  Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
}
