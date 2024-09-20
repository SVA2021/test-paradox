import { TagsEffects } from '@store/tags/tag.effects';
import { NoticesEffects } from '@store/notices/notice.effects';
import { RemindersEffects } from '@store/reminders/reminder.effects';

export const appEffects = [NoticesEffects, RemindersEffects, TagsEffects];
