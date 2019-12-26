import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackService } from 'src/app/shared/services/snack.service';


@Injectable({
  providedIn: 'root'
})

export class ErrorInterceptor implements HttpInterceptor {
  msg = '';
  fails = '';
  errorText = '';

  constructor(
    public snackService: SnackService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        console.log(error);
        this.handleAuthError(error);
        return of(error.error.status_message);
      }) as any);
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    switch (+err.status) {
      case 401:
      case 409:
        this.msg = err.error.message;
        this.fails = '';
        break;
      case 422:
        this.msg = err.error.message;
        for (const key of Object.keys(err.error.fails)) {
          this.fails += err.error.fails[key];
        }
        break;
      case 500 || 503:
        this.msg = 'Внутренняя ошибка сервера. Попробуйте еще раз.';
        break;
      default:
        this.msg = `${err.statusText} ${err.status}`;
        break;
    }
    this.snackService.openSnack('danger', { status: 'Error!', msg: this.msg, fails: this.fails });
    throw (err);
  }
}
