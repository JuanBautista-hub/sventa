import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes('users')) {
      const userValue:string = this.authSvc.userResponseValue.token || "undefined"
      const authReq = req.clone({
        setHeaders: {
          auth: userValue,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }

  }
