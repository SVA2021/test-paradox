import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiHeader } from '@taiga-ui/layout';
import { TuiTitle } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { selectTags } from '@store/tags/tag.selectors';
import { ReplaySubject, takeUntil } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoaderComponent } from '@components/loader/loader.component';
import { EmptyListComponent } from '@components/empty-list/empty-list.component';

@Component({
  selector: 'app-tags-page',
  standalone: true,
  imports: [TuiHeader, TuiTitle, NgIf, AsyncPipe, LoaderComponent, EmptyListComponent],
  templateUrl: './tags-page.component.html',
  styleUrl: './tags-page.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsPageComponent {
  private readonly store = inject(Store);
  private readonly destroy$ = new ReplaySubject(1);
  tags$ = this.store.select(selectTags).pipe(takeUntil(this.destroy$));
}
