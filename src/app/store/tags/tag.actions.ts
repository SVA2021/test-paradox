import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Tag } from '@core/models/tag.model';

export const TagActions = createActionGroup({
  source: 'Tag',
  events: {
    'Reset Tags': emptyProps(),
    'Fetch Tags': emptyProps(),
    'Load Tags': props<{ tags: Tag[] }>(),
    'Add Tag': props<{ tag: Tag }>(),
    'Update Tag': props<{ tag: Tag }>(),
    'Delete Tag': props<{ id: string }>(),
  },
});
