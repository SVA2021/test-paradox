import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { NoticesApiService } from '@core/services/api/notices-api.service';
import { NoticeActions } from '@store/notices/notice.actions';

@Injectable()
export class NoticesEffects {
  actions$ = inject(Actions);
  noticesApiService = inject(NoticesApiService);

  fetchNotices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NoticeActions.fetchNotices),
      exhaustMap(() =>
        this.noticesApiService.getNotices().pipe(
          map((notices) => NoticeActions.loadNotices({ notices })),
          catchError(() => EMPTY),
        ),
      ),
    );
  });
}
