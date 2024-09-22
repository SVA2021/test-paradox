import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NoticeState } from '@store/notices/notice.reducer';

const selectNoticesFeature = createFeatureSelector<NoticeState>('notices');

export const selectNotices = createSelector(selectNoticesFeature, (state: NoticeState) => state);
