import { createReducer, on } from '@ngrx/store';
import { TagActions } from './tag.actions';
import { Tag } from '@core/models/tag.model';

export const tagFeatureKey = 'tag';

export type TagsState = Tag[];
export const initialState: TagsState = [];

export const tagsReducer = createReducer(
  initialState,
  on(TagActions.resetTags, (): TagsState => {
    return initialState;
  }),
  on(TagActions.loadTags, (state, { tags }): TagsState => {
    return tags;
  }),
  on(TagActions.addTag, (state, { tag }): TagsState => {
    return [...state, tag];
  }),
  on(TagActions.updateTag, (state, { tag }): TagsState => {
    return state.map((t) => (t.id === tag.id ? tag : t));
  }),
  on(TagActions.deleteTag, (state, { id }): TagsState => {
    return state.filter((t) => t.id !== id);
  }),
);
