import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Reminder } from '@core/models/reminder.model';

export const ReminderActions = createActionGroup({
  source: 'Reminder',
  events: {
    'Reset Reminders': emptyProps(),
    'Fetch Reminders': emptyProps(),
    'Load Reminders': props<{ reminders: Reminder[] }>(),
    'Add Reminder': props<{ reminder: Reminder }>(),
    'Update Reminder': props<{ reminder: Reminder }>(),
    'Delete Reminder': props<{ id: string }>(),
  },
});
