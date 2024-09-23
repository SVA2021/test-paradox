import { ChangeDetectionStrategy, Component, inject, INJECTOR, OnDestroy, OnInit } from '@angular/core';
import { TuiAlertService, TuiButton, TuiDialogService, TuiTitle } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { combineLatest, interval, ReplaySubject, takeUntil } from 'rxjs';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { selectReminders } from '@store/reminders/reminder.selectors';
import { ReminderFormComponent } from '@pages/reminders-page/components/reminder-form/reminder-form.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { EmptyListComponent } from '@components/empty-list/empty-list.component';
import { LoaderComponent } from '@components/loader/loader.component';
import { TagCardComponent } from '@pages/tags-page/components/tag-card/tag-card.component';
import { TuiHeader } from '@taiga-ui/layout';
import { ReminderCardComponent } from '@pages/reminders-page/components/reminder-card/reminder-card.component';

@Component({
  selector: 'app-reminders-page',
  standalone: true,
  imports: [
    AsyncPipe,
    EmptyListComponent,
    LoaderComponent,
    NgIf,
    TagCardComponent,
    TuiButton,
    TuiHeader,
    TuiTitle,
    ReminderCardComponent,
  ],
  templateUrl: './reminders-page.component.html',
  styleUrl: './reminders-page.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemindersPageComponent implements OnInit, OnDestroy {
  private readonly alerts = inject(TuiAlertService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly injector = inject(INJECTOR);
  private readonly store = inject(Store);
  private readonly destroy$ = new ReplaySubject(1);
  reminders$ = this.store.select(selectReminders).pipe(takeUntil(this.destroy$));

  ngOnInit() {
    combineLatest([interval(10000), this.reminders$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([, reminders]) => {
        const nowTime = Date.now();
        const warningReminders = reminders.filter(
          (w) => w.withAlarm && w.timestamp < nowTime && nowTime - w.timestamp < 60000,
        );
        warningReminders.forEach((w) => {
          this.alerts
            .open(w.description, {
              label: w.title,
              autoClose: 9000,
              appearance: nowTime - w.timestamp <= 10000 ? 'warning' : 'error',
            })
            .pipe(takeUntil(this.destroy$))
            .subscribe();
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  addReminder() {
    this.dialogs
      .open<boolean>(new PolymorpheusComponent(ReminderFormComponent, this.injector), {
        data: null,
        dismissible: false,
        closeable: false,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
