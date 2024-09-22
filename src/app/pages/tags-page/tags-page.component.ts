import { ChangeDetectionStrategy, Component, inject, INJECTOR, OnDestroy } from '@angular/core';
import { TuiHeader } from '@taiga-ui/layout';
import { TuiButton, TuiDialogService, TuiTitle } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { selectTags } from '@store/tags/tag.selectors';
import { ReplaySubject, takeUntil } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoaderComponent } from '@components/loader/loader.component';
import { EmptyListComponent } from '@components/empty-list/empty-list.component';
import { TagCardComponent } from '@pages/tags-page/components/tag-card/tag-card.component';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { TagFormComponent } from '@pages/tags-page/components/tag-form/tag-form.component';

@Component({
  selector: 'app-tags-page',
  standalone: true,
  imports: [TuiHeader, TuiTitle, NgIf, AsyncPipe, LoaderComponent, EmptyListComponent, TagCardComponent, TuiButton],
  templateUrl: './tags-page.component.html',
  styleUrl: './tags-page.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsPageComponent implements OnDestroy {
  private readonly dialogs = inject(TuiDialogService);
  private readonly injector = inject(INJECTOR);
  private readonly store = inject(Store);
  private readonly destroy$ = new ReplaySubject(1);
  tags$ = this.store.select(selectTags).pipe(takeUntil(this.destroy$));

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  addTag() {
    this.dialogs
      .open<boolean>(new PolymorpheusComponent(TagFormComponent, this.injector), {
        data: null,
        dismissible: false,
        closeable: false,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
