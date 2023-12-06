/**
 * Fix Loading Chunk Failed Error in React
 * @ref https://medium.com/@botfather/react-loading-chunk-failed-error-88d0bb75b406
 * @ref https://gist.github.com/Botfather/4cfc9c7ba363c892acced7cc44d9f7ff#file-componentloader-js
 * @param {any} lazyComponent
 * @param {number} attemptsLeft
 * @param {number} interval
 * @returns Promise
 */
const ComponentLoader = (lazyComponent, attemptsLeft = 3, interval = 1000) => {
  return new Promise((resolve, reject) => {
    lazyComponent()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (attemptsLeft === 1) {
            reject(error);
            return;
          }
          ComponentLoader(lazyComponent, attemptsLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
};

export default ComponentLoader;
