function fib(n: number) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

const handler = (n: number) => {
  return fib(n);
}

module.exports = handler;
