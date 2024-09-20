import { createReducer, on } from '@ngrx/store';
import { ReminderActions } from './reminder.actions';
import { Reminder } from '@core/models/reminder.model';

export const reminderFeatureKey = 'reminder';

export type ReminderState = Reminder[];

export const initialState: ReminderState = [];

export const remindersReducer = createReducer(
  initialState,
  on(ReminderActions.resetReminders, (): ReminderState => {
    return initialState;
  }),
  on(ReminderActions.loadReminders, (state, { reminders }): ReminderState => {
    return reminders;
  }),
  on(ReminderActions.addReminder, (state, { reminder }): ReminderState => {
    return [...state, reminder];
  }),
  on(ReminderActions.updateReminder, (state, { reminder }): ReminderState => {
    return state.map((r) => (r.id === reminder.id ? reminder : r));
  }),
  on(ReminderActions.deleteReminder, (state, { id }): ReminderState => {
    return state.filter((r) => r.id !== id);
  }),
);
