# NATs

Lightweight, high performance, open source message broker for distributed systems, cloud native apps, and microservices architectures.

It provides a simple yet powerful API that allows to easily build distrubuted systems.

The NATs server is written in Go, but client available in other languages as well. It's easy to setup and it natively supports

NATs supports the following delivery options:

- At Most Once:
  - Message is delivered zero or once;
  - Message may be lost;
- At Least Once:
  - Message delivered at least once;
  - Messages may be duplicated but not lost;

In NATs, when subscribers register themselves to retrieve message from a publisher, the `1-to-N` fanout pattern of messaging ensures that any message sent by a publisher reaches all subscribers that have registered.

NATs also provides a feature named `Queue`, which allows subscribers to register themselves as part of a queue, forming a `Queue Group`.

To enable `Request-Response` nessage type (NATs provides this dual channel setup out-of-the-box), Nest uses (creates if not supported by the underlying technology) 2 logical channels:

- Request Channel (responsible for transferring data)
- Response Channel (waits for incoming responses)
