import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { RemindersApiService } from '@core/services/api/reminders-api.service';
import { ReminderActions } from '@store/reminders/reminder.actions';

@Injectable()
export class RemindersEffects {
  actions$ = inject(Actions);
  remindersApiService = inject(RemindersApiService);

  fetchReminders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReminderActions.fetchReminders),
      exhaustMap(() =>
        this.remindersApiService.getReminders().pipe(
          map((reminders) => ReminderActions.loadReminders({ reminders })),
          catchError(() => EMPTY),
        ),
      ),
    );
  });
}
