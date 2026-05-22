import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const notify = inject(NotificationService);

  return next(req).pipe(
    tap(event => {
    if (event.type === 4) {
      if (req.method !== 'GET') {
        notify.showSuccess('Operación realizada con éxito');
      }
    }
  }),
    catchError((error) => {
      const message = error.error?.message || 'Ocurrió un error inesperado';
      notify.showError(message);
      return throwError(() => error);
    })
  );
};