import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Notice } from '@core/models/notice.model';

export const NoticeActions = createActionGroup({
  source: 'Notice',
  events: {
    'Reset Notices': emptyProps(),
    'Fetch Notices': emptyProps(),
    'Load Notices': props<{ notices: Notice[] }>(),
    'Add Notice': props<{ notice: Notice }>(),
    'Update Notice': props<{ notice: Notice }>(),
    'Delete Notice': props<{ id: string }>(),
  },
});
