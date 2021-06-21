import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(public loaderService:LoadingService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.loaderService.show()
      return next.handle(req).pipe(
        finalize(
          ()=>{
            this.loaderService.hide()
          }
        )
      )
  }
}