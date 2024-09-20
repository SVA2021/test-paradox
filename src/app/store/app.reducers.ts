import { tagsReducer, TagsState } from '@store/tags/tag.reducer';
import { ActionReducer } from '@ngrx/store';

export interface AppState {
  tags: TagsState;
}

export interface AppStore {
  tags: ActionReducer<TagsState>;
}

export const appStore: AppStore = {
  tags: tagsReducer,
};
