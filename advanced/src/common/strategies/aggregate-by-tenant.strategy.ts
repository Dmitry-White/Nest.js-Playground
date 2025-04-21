import {
  ContextId,
  ContextIdFactory,
  ContextIdResolver,
  ContextIdResolverFn,
  ContextIdStrategy,
  HostComponentInfo,
} from '@nestjs/core';
import { Request } from 'express';

export class AggregateByTenantContextIdStrategy implements ContextIdStrategy {
  // A collection of context identifiers
  // representing separate DI sub-trees per tenant
  private readonly tenants = new Map<string, ContextId>();

  attach(
    contextId: ContextId,
    request: Request,
  ): ContextIdResolverFn | ContextIdResolver {
    const tenantId = request.headers['x-tenant-id'] as string;
    if (!tenantId) {
      return () => contextId;
    }

    const knownTenant = this.tenants.has(tenantId);

    return knownTenant
      ? this.resolveKnownTenant(contextId, tenantId)
      : this.resolveUnknownTenant(contextId, tenantId);
  }

  private resolveKnownTenant(contextId: ContextId, tenantId: string) {
    const tenant = this.tenants.get(tenantId);
    if (!tenant) {
      return () => contextId;
    }

    return this.getResolver(contextId, tenantId, tenant);
  }

  private resolveUnknownTenant(contextId: ContextId, tenantId: string) {
    const tenant = ContextIdFactory.create();
    this.tenants.set(tenantId, tenant);
    setTimeout(() => this.tenants.delete(tenantId), 3000);

    return this.getResolver(contextId, tenantId, tenant);
  }

  private getResolver(
    contextId: ContextId,
    tenantId: string,
    tenant: ContextId,
  ) {
    return {
      payload: { tenantId },
      resolve: (info: HostComponentInfo) =>
        info.isTreeDurable ? tenant : contextId,
    };
  }
}
