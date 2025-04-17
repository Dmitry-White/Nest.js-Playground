const SUCCESS_THRESHOLD = 3; // the number of successful operations above which we close the circuit
const FAILURE_THRESHOLD = 3; // the number of failures above which we open the circuit
const OPEN_TO_HALF_OPEN_WAIT_TIME = 60000; // 1 minute in milliseconds

enum CircuitBreakerState {
  Closed,
  Open,
  HalfOpen,
}

export {
  SUCCESS_THRESHOLD,
  FAILURE_THRESHOLD,
  OPEN_TO_HALF_OPEN_WAIT_TIME,
  CircuitBreakerState,
};
