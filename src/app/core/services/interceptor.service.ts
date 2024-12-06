import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer `, // Replace with dynamic token
        'Content-Type': 'application/json'
      }
    });

    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle errors
        let errorMessage = 'An unknown error occurred!';
        console.error(errorMessage);
        alert(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
