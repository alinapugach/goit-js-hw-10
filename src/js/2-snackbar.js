'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const createPromiseButtonEl = document.getElementsByTagName('button')[0];
const inputEl = document.getElementsByName('delay')[0];
const checkedFulfilled = document.getElementsByName('state')[0];
const checkedRejected = document.getElementsByName('state')[1];
let inputValue;
let promise;

iziToast.info({
  title: 'Hello',
  message: 'Welcome!',
});

inputEl.addEventListener('input', function () {
  inputValue = inputEl.value;
});

createPromiseButtonEl.addEventListener('click', event => {
  if (inputValue == null) {
    iziToast.warning({
      title: 'Caution',
      message: 'You forgot important data',
    });
  }
  promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (checkedFulfilled.checked) {
        resolve(inputValue);
      } else {
        reject(inputValue);
      }
    }, +inputValue);
  });

  promise.then(onFulFilled, onRejected);
  event.preventDefault();
});

function onFulFilled(delay) {
  iziToast.success({
    title: 'OK',
    message: `Fulfilled promise in ${delay}ms`,
  });
}

function onRejected() {
  iziToast.error({
    title: 'Error',
    message: 'Illegal operation',
  });
}
