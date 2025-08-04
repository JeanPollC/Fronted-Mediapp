import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, retry, tap, catchError, EMPTY } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class serverErrorsInterceptor implements HttpInterceptor {

    constructor(private snackbar: MatSnackBar){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(retry(environment.RETRY))
                .pipe(tap(event => {
                    if(event instanceof HttpResponse){
                        if(event.body && event.body.error === true && event.body.errorMessage){
                            throw new Error(event.body.errorMessage);
                        }/*else {
                            this.snackbar.open('SUCCESS', 'INFO', {duration: 2000})
                        }*/
                    }
                })).pipe(catchError( (err) => {
                    if(err.status === 400){
                        this.snackbar.open(err.message, 'ERROR 400', { duration: 5000 })
                    }
                    else if(err.status === 404){
                        this.snackbar.open('No existe el recurso', 'ERROR 404', {duration: 5000})
                    }
                    else if(err.status === 403){
                        this.snackbar.open(err.error.message, ' ERROR 403', {duration: 5000})
                    }
                    else if(err.status === 500){
                        this.snackbar.open(err.error.message, ' ERROR 500', {duration: 5000})
                    }
                    else{
                        this.snackbar.open(err.error.message, ' ERROR', {duration: 5000})
                    }

                    return EMPTY;
                }));
    }
    
}