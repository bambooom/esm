import random from 'lodash/random';


export default function delayIt(fn, {delay = 100} = {}) {
  return new Promise((resolve, reject) => {
    let ts = random(delay, delay * 1.5);

    setTimeout(() => {
      try {
        resolve(fn());
      } catch (ex) {
        reject(ex);
      }
    }, ts);
  });
};

