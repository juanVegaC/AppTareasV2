import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { MessageService } from '../_services/message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    public messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if(error) {
          switch (error.status) {
            case 400:
              if(error.error.errors){
                const modalStateErrors = [];
                for(const key in error.error.errors){
                  if(error.error.errors[key]){
                    modalStateErrors.push(error.error.errors[key])
                  }
                }
                throw modalStateErrors.flat();
              }else if(typeof(error.error) === "object"){
                console.log(error);
                error.error.forEach(merror => {
                  this.messageService.setMessage({type:"E",text:merror.description,number:101, displayStyle:"Negative"});
                  //this.toastr.error(merror.description, error.status)
                }); 
              }else{
                console.log(error);
                //this.toastr.error(error.error, error.status);
              }
              break;
            case 401:
              console.log(error);
                this.messageService.setMessage({type:"E",text:"Error en las credenciales, favor de validar",number:102, displayStyle:"Negative"});
                //this.messageService.setMessage({type:"E",text:"Error en las credenciales, favor de validar: " + JSON.stringify(error),number:102, displayStyle:"Negative"});
                //this.toastr.error(error.statusText === "OK" ? "Unauthorized" : error.statusText, error.status);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state: {error: error.error}};
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              console.log(error);
              this.messageService.setMessage({type:"E",text:"Algo salio mal, :(",number:103, displayStyle:"Negative"});
              //this.toastr.error('Something unexpected went wrong');
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}

