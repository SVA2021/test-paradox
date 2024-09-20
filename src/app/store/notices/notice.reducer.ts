import { createReducer, on } from '@ngrx/store';
import { NoticeActions } from './notice.actions';
import { Notice } from '@core/models/notice.model';

export const noticeFeatureKey = 'notice';

export type NoticeState = Notice[];

export const initialState: NoticeState = [];

export const noticesReducer = createReducer(
  initialState,
  on(NoticeActions.resetNotices, (): NoticeState => {
    return initialState;
  }),
  on(NoticeActions.loadNotices, (state, { notices }): NoticeState => {
    return notices;
  }),
  on(NoticeActions.addNotice, (state, { notice }): NoticeState => {
    return [...state, notice];
  }),
  on(NoticeActions.updateNotice, (state, { notice }): NoticeState => {
    return state.map((n) => (n.id === notice.id ? notice : n));
  }),
  on(NoticeActions.deleteNotice, (state, { id }): NoticeState => {
    return state.filter((n) => n.id !== id);
  }),
);
