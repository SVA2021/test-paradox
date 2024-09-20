import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TagsState } from '@store/tags/tag.reducer';

const selectTagsFeature = createFeatureSelector<TagsState>('tags');

export const selectTags = createSelector(selectTagsFeature, (state: TagsState) => state);
