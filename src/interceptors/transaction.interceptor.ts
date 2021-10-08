import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { from, Observable, throwError } from 'rxjs';
import { catchError, mapTo, switchMap, tap } from 'rxjs/operators';

import { Connection } from 'mongoose';
import { MONGO_SESSION_KEY } from '@app/constants/system.constant';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  /**
   * A Mongoose Connection is injected, so we can use
   * it to create and start a session.
   */
  constructor(@InjectConnection() private readonly connection: Connection) {}

  /**
   * The `intercept` method return a Promise, since we
   * are `await`-ing the `startSession` method on the
   * connection. The returned Promise holds an Observable
   * we use to pipe different operators together.
   */
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const session = await this.connection.startSession();

    /**
     * We assign the newly created session to the
     * the context, which allows us to access
     * the session later on via a `Custom Decorator`.
     */
    ctx[MONGO_SESSION_KEY] = session;
    session.startTransaction();

    /**
     * A chain of RxJS Observables is used to `pipe` the
     * operations together. In the end, we either commit
     * or abort the transactions, followed by a final statement
     * to end the transaction.
     */
    return next.handle().pipe(
      switchMap((data) =>
        from(
          session.inTransaction()
            ? session.commitTransaction()
            : Promise.resolve(),
        ).pipe(mapTo(data)),
      ),
      tap(() => session.inTransaction() && session.endSession()),
      catchError(async (err) => {
        if (session.inTransaction()) {
          await session.abortTransaction();
          session.endSession();
        }

        throw err;
      }),
    );
  }
}
