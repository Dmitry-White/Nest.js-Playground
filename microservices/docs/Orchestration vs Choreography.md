# Orchestration vs Choreography

`Orchestration` is a centralized approach to service coordination. In this approach, we have a central component (called `orchestrator`) that is responsible for coordinating the execution of services. The orchestrator is aware of the state of each service and knows exactly when to invoke each service. The orchestrator is also responsible for handling errors and retries. Note that this orchestrator could be implemented as either a separate service or it could be part of one of the existing services.

`Choreography` is a decentralized approach to service coordination. In this approach, each service is responsible for handling its own state and knows exactly when to invoke other services. The services communicate with each other using events. The main advantage of this approach is that it's more flexible and scalable. However, it's also more complex and harder to debug.

Each of these approaches has its own pros and cons as there is no one-size-fits-all solution. In some cases, orchestration might be a better choice, while in others choreography might work out better. It all depends on your specific use case.
