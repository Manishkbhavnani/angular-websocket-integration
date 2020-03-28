
// Angular or Third party Imports
import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Own Imports
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';


/**
 * @author Manish Bhavnani
 * Error Interceptor For Http Request
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService, private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            const toaster = this.injector.get(ToastrService);
            if (err.status === 401 || err.status === 500 || err.status === 404) {
                // auto logout if 401 unauthorized response returned from api
                toaster.error(err.error.error, 'Error', {
                    timeOut: 3000
                });

                this.authenticationService.logoutAutherized();
                // location.reload(true);
            }
            if (err.status === 0) {
                toaster.error('Server is down', 'Error', {
                    timeOut: 3000
                });
            }
            return throwError(err);
        }));
    }
}
