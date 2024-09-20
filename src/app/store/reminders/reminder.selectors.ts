import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReminderState } from '@store/reminders/reminder.reducer';

const selectRemindersFeature = createFeatureSelector<ReminderState>('reminder');

export const selectReminders = createSelector(selectRemindersFeature, (state: ReminderState) => state);
