# Data Consistency

In monolithic applications, `ACID` might be used for database transactions, which stands for `(A)tomicity`, `(C)onsistency`, `(I)solation`, and `(D)urability` to ensure `Data Consistency`.

However, this is harder to apply to microservices architectures.
And in the absence of ACID, failures might cause inconsistent state in the system and there won't be a mechanism in place to recover from this state. Simply wrapping involved operations with a transaction might not be possible as the state change is spread throughout the system and occurs at a different points in time.

So, for microservices architectures, there are several approaches for Data Consistency concerns:

- Inbox Pattern
  Instead of directly receiving calls from other services or consuming their messages as part of some cross-service transaction, the system stores all incoming messages in a DB (i.e. table called "inbox"), and then a separate process called "Inbox Processor" preiodically checks for the new messages and subsequently processes them.
  This pattern is particularly useful for consumer side of things, where the system can check if the message was already processed or not, achieving the so-called `exactly once` delivery guarantee.
- Transactional Outbox Pattern
  Instead of directly calling other services or sending messages to a broker as part of the local transaction, a new message is inserted into a DB (i.e. table called "outbox"), and then "send it" to other relevant services using a separate process called "Outbox Processor".
  This pattern is particularly useful when the system can't afford to lose messages, and needs to ensure that the messages are eventually delivered to the relevant services, hence achieving the so-called `at least once` delivery guarantee.
- Saga Pattern;

Using the above approaches, a so-called `eventual consistency` can be achieved, which means that the system state/data will eventually become "consistent". In other words, in microservices architecture it's not always possible to guarantee that the system will immediately become consistent and this needs to be taken into account.

Applicability of `eventual consistency` depends on specific use cases, application requirements, and business needs.
