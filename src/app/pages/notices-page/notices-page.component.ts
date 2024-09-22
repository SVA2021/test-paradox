import { ChangeDetectionStrategy, Component, inject, INJECTOR, OnDestroy } from '@angular/core';
import { TuiButton, TuiDialogService, TuiTitle } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { ReplaySubject, takeUntil } from 'rxjs';
import { selectNotices } from '@store/notices/notice.selectors';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { NoticeFormComponent } from '@pages/notices-page/components/notice-form/notice-form.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { EmptyListComponent } from '@components/empty-list/empty-list.component';
import { LoaderComponent } from '@components/loader/loader.component';
import { TuiHeader } from '@taiga-ui/layout';
import { NoticeCardComponent } from '@pages/notices-page/components/notice-card/notice-card.component';

@Component({
  selector: 'app-notices-page',
  standalone: true,
  imports: [AsyncPipe, EmptyListComponent, LoaderComponent, NgIf, TuiButton, TuiHeader, TuiTitle, NoticeCardComponent],
  templateUrl: './notices-page.component.html',
  styleUrl: './notices-page.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticesPageComponent implements OnDestroy {
  private readonly dialogs = inject(TuiDialogService);
  private readonly injector = inject(INJECTOR);
  private readonly store = inject(Store);
  private readonly destroy$ = new ReplaySubject(1);

  notices$ = this.store.select(selectNotices).pipe(takeUntil(this.destroy$));

  addNotice() {
    this.dialogs
      .open<boolean>(new PolymorpheusComponent(NoticeFormComponent, this.injector), {
        data: null,
        dismissible: false,
        closeable: false,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
