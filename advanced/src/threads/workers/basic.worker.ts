import { parentPort } from 'worker_threads';

import { MESSAGE_KEY } from '../threads.constants';

function fib(n: number) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

const handler = ({ id, n }) => {
  const result = fib(n);
  parentPort?.postMessage({ id, result });
};

parentPort?.on(MESSAGE_KEY, handler);
