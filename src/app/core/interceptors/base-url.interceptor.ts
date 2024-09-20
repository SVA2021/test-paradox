import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from "@environments/environment";

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('@api')) {
    const clonedReq = req.clone({
      url: req.url.replace('@api', environment.apiUrl),
    });
    return next(clonedReq);
  }
  return next(req);
};
