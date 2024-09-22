import { ChangeDetectionStrategy, Component, inject, INJECTOR, Input, OnDestroy } from '@angular/core';
import { TuiButton, TuiDialogService, TuiIconPipe, TuiSurface, TuiTitle } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { ReplaySubject, takeUntil } from 'rxjs';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { ConfirmDeleteDialogComponent } from '@components/confirm-delete-dialog/confirm-delete-dialog.component';
import { Reminder } from '@core/models/reminder.model';
import { RemindersApiService } from '@core/services/api/reminders-api.service';
import { ReminderActions } from '@store/reminders/reminder.actions';
import { ReminderFormComponent } from '@pages/reminders-page/components/reminder-form/reminder-form.component';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiFade, TuiTab } from '@taiga-ui/kit';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-reminder-card',
  standalone: true,
  imports: [TuiButton, TuiCardLarge, TuiFade, TuiHeader, TuiSurface, TuiTitle, NgIf, DatePipe, TuiIconPipe, TuiTab],
  templateUrl: './reminder-card.component.html',
  styleUrl: './reminder-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReminderCardComponent implements OnDestroy {
  @Input() reminder!: Reminder;

  private readonly dialogs = inject(TuiDialogService);
  private readonly injector = inject(INJECTOR);
  private readonly remindersApiService = inject(RemindersApiService);
  private readonly store = inject(Store);
  private readonly destroy$ = new ReplaySubject(1);

  currentTimestamp = Date.now();

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  delete() {
    this.dialogs
      .open<boolean>(new PolymorpheusComponent(ConfirmDeleteDialogComponent, this.injector), {
        data: `Reminder: ${this.reminder.title}`,
        dismissible: false,
        closeable: false,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        if (v) {
          this.remindersApiService.deleteReminder(this.reminder.id).subscribe(() => {
            this.store.dispatch(ReminderActions.deleteReminder({ id: this.reminder.id }));
          });
        }
      });
  }

  edit(reminder: Reminder) {
    this.dialogs
      .open<boolean>(new PolymorpheusComponent(ReminderFormComponent, this.injector), {
        data: reminder,
        dismissible: false,
        closeable: false,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
