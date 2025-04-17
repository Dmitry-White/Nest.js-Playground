import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { CircuitBreakerService } from './circuit-breaker.service';

@Injectable()
export class CircuitBreakerInterceptor implements NestInterceptor {
  private readonly circuitBreakerByHandler = new WeakMap<
    Function,
    CircuitBreakerService
  >();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const methodRef = context.getHandler();
    const isRegistered = this.circuitBreakerByHandler.has(methodRef);

    if (!isRegistered) {
      const circuitBreaker = new CircuitBreakerService();
      this.circuitBreakerByHandler.set(methodRef, circuitBreaker);

      return circuitBreaker.exec(next);
    }

    const circuitBreaker = this.circuitBreakerByHandler.get(methodRef);
    if (!circuitBreaker) {
      return new Observable<null>();
    }

    return circuitBreaker.exec(next);
  }
}
