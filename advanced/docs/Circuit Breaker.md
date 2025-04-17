# Circuit Breaker

It's common for applications to make remote calls to services running in different processes or even on different machines.

In a distributed environment, calls to remote resources and services can fail due to a variety of reasons, be it network connections, timeouts, or the resources being temporarily unavailable.

What could make matters worse, is if there are many callers to an unresponsive supplier, it's possible a system could run out of critical resources leading to cascading failures across multiple systems (also known as a `snowball effect`).

These types of faults commonly resolve themselves after a short period of time, and any robust cloud application should be prepared to handle them by using a strategy such as the `Retry Pattern` (or many other strategies).

However, there could also be situations where faults are due to unanticipated events, and situations like that might take much longer to fix. In these tough situations, it might be meaningless for an application to continually retry an operation that is unlikely to succeed, so instead, the application should quickly accept that the operation has failed, and handle this failure accordingly - which is exactly the role a `Circuit Breaker` pattern plays.
