import { tagsReducer, TagsState } from '@store/tags/tag.reducer';
import { ActionReducer } from '@ngrx/store';
import { noticesReducer, NoticeState } from '@store/notices/notice.reducer';

export interface AppState {
  notices: NoticeState;
  tags: TagsState;
}

export interface AppStore {
  notices: ActionReducer<NoticeState>;
  tags: ActionReducer<TagsState>;
}

export const appStore: AppStore = {
  notices: noticesReducer,
  tags: tagsReducer,
};
