import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({ url: environment.apiUrl + request.url });
    }
    return next.handle(request);
  }
}
