import { tagsReducer, TagsState } from '@store/tags/tag.reducer';
import { ActionReducer } from '@ngrx/store';
import { noticesReducer, NoticeState } from '@store/notices/notice.reducer';
import { remindersReducer, ReminderState } from '@store/reminders/reminder.reducer';

export interface AppState {
  notices: NoticeState;
  reminders: ReminderState;
  tags: TagsState;
}

export interface AppStore {
  notices: ActionReducer<NoticeState>;
  reminders: ActionReducer<ReminderState>;
  tags: ActionReducer<TagsState>;
}

export const appStore: AppStore = {
  notices: noticesReducer,
  reminders: remindersReducer,
  tags: tagsReducer,
};
