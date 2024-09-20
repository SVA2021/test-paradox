import { TagsEffects } from '@store/tags/tag.effects';
import { NoticesEffects } from '@store/notices/notice.effects';

export const appEffects = [NoticesEffects, TagsEffects];
