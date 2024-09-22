import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTags } from '@store/tags/tag.selectors';
import { map, ReplaySubject, takeUntil } from 'rxjs';
import { Tag } from '@core/models/tag.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { TuiHintDirective } from '@taiga-ui/core';

@Component({
  selector: 'app-notice-card-tags',
  standalone: true,
  imports: [AsyncPipe, NgIf, TuiHintDirective],
  templateUrl: './notice-card-tags.component.html',
  styleUrl: './notice-card-tags.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticeCardTagsComponent implements OnDestroy, OnChanges {
  @Input() tagIds!: string[];

  private readonly store = inject(Store);
  private readonly destroy$ = new ReplaySubject(1);
  tags$ = this.store.select(selectTags).pipe(
    map((tags) => this.getFilteredTags(tags)),
    takeUntil(this.destroy$),
  );

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tagIds']?.previousValue !== changes['tagIds']?.currentValue) {
      this.tags$ = this.store.select(selectTags).pipe(
        map((tags) => this.getFilteredTags(tags)),
        takeUntil(this.destroy$),
      );
    }
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private getFilteredTags(tags: Tag[]): Tag[] {
    return tags.filter((w) => this.tagIds.includes(w.id));
  }
}
