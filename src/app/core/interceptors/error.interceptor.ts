import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from "@angular/core";
import { TuiAlertService } from "@taiga-ui/core";
import { catchError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(TuiAlertService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      if ([401, 403].includes(error.status)) {
        alertService.open(`You are not authorized`).subscribe();
      }
      if ([400, 404].includes(error.status)) {
        alertService.open(`Bad request or not found`).subscribe();
      }
      if ([500].includes(error.status)) {
        alertService.open(`Server error`).subscribe();
      }
      throw error;
    })
  );
};
