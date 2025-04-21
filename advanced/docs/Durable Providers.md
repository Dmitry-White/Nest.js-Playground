# Durable Providers

## Overview

Request scoped providers can sometimes lead to increased latency due to "hoisting" nature of any request-scoped construct making everything in the request chain recreated or instantiated for each individual request and garbage collected afterwards.

Apart from performance implications, this can also pose a challenge in multi-tenant application, especially for those that have a central request scoped data source provider that grabs scpecific to that tenant information. While being complex enough of a setup already, this opens up a number of compliance and security concerns.

## Multi-Tenancy

`Multi-tenancy` is an architecture in which a single instance of a software application serves multiple tenants/customers. Each tenant has its own set of data, as a major security concern is data partitioning across account or tenants.
The most common use case for multi-tenant systems are SaaS based applications whic use different levels of data isolation depending on the domain of the application:

- Silo Model (separate database instance per tenant)
  - Lower risk due to strict data separation;
  - Higher infra cost;
  - Higher Provision & Management cost;
  - No extra security measures part from standard;
- Pool Model (all tenants share one database instances)
  - Higher risk due to partition-based data separation;
  - Efficient infra usage;
  - Lower Provision & Management cost;
  - Needs RLS (row-level security);
- Bridge Model (share one database instance, but different schemas)
  - Medium risk due to partitioned data separation with different schemas;
  - Efficient infra usage;
  - Medium Provision & Management cost;
  - Needs specific security measures for a few high-value tenants;

If app's providers don't rely on any property that's truly unique for each consecutive request, like UUIDs, but instead there are some specific attributes that allow aggregation on, then there's no reason to recreate a DI subtree on every incoming request - an ideal use case for `Durable Providers`.
