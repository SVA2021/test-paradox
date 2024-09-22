import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { TuiButton, TuiDialogContext, TuiTitle } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { UuidGeneratorService } from '@core/services/uuid-generator.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RemindersApiService } from '@core/services/api/reminders-api.service';
import { Reminder } from '@core/models/reminder.model';
import { ReminderActions } from '@store/reminders/reminder.actions';
import { TuiHeader } from '@taiga-ui/layout';
import {
  TuiInputDateTimeModule,
  TuiInputModule,
  TuiTextareaModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { TuiSwitch } from '@taiga-ui/kit';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { DateService } from '@core/services/date.service';

@Component({
  selector: 'app-reminder-form',
  standalone: true,
  imports: [
    FormsModule,
    TuiHeader,
    TuiTitle,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextareaModule,
    TuiButton,
    TuiTextfieldControllerModule,
    TuiInputDateTimeModule,
    TuiSwitch,
  ],
  templateUrl: './reminder-form.component.html',
  styleUrl: './reminder-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReminderFormComponent implements OnInit {
  private readonly context = injectContext<TuiDialogContext<boolean, Reminder | null>>();
  private readonly dateService = inject(DateService);
  private readonly remindersApiService = inject(RemindersApiService);
  private readonly store = inject(Store);
  private readonly uuidService = inject(UuidGeneratorService);

  readonly reminderForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]),
    description: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    withAlarm: new FormControl<boolean>(true, [Validators.required]),
    timestamp: new FormControl<[TuiDay | null, TuiTime | null]>([new TuiDay(2024, 10, 1), null]),
  });

  isEdit = false;

  ngOnInit() {
    this.isEdit = !!this.context.data;
    this.setForm();
  }

  closeDialog() {
    this.context.completeWith(false);
  }

  submit() {
    if (this.reminderForm.invalid || this.reminderForm.pristine) {
      this.reminderForm.markAllAsTouched();
      return;
    }
    const body: Reminder = {
      id: this.isEdit ? this.context.data.id : this.uuidService.getUUID(),
      title: this.reminderForm.value.title as string,
      description: this.reminderForm.value.description as string,
      withAlarm: !!this.reminderForm.value.withAlarm,
      timestamp: this.dateService.getTimeStampFromTuiDateTime(this.reminderForm.value.timestamp) as number,
    };
    if (this.isEdit) {
      this.updateReminder(body);
    } else {
      this.createReminder(body);
    }
  }

  private createReminder(reminder: Reminder) {
    this.remindersApiService.addReminder(reminder).subscribe(() => {
      this.store.dispatch(ReminderActions.addReminder({ reminder }));
      this.context.completeWith(true);
    });
  }

  private updateReminder(reminder: Reminder) {
    this.remindersApiService.updateReminder(reminder).subscribe(() => {
      this.store.dispatch(ReminderActions.updateReminder({ reminder }));
      this.context.completeWith(true);
    });
  }

  private setForm() {
    if (this.isEdit) {
      this.reminderForm.patchValue({
        title: this.context.data.title,
        description: this.context.data.description,
        withAlarm: this.context.data.withAlarm,
        timestamp: this.dateService.getTuiDayTimeFromTimestamp(this.context.data.timestamp),
      });
    }
  }
}
