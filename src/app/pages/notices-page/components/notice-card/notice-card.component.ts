import { ChangeDetectionStrategy, Component, inject, INJECTOR, Input } from '@angular/core';
import { Notice } from '@core/models/notice.model';
import { TuiButton, TuiDialogService, TuiSurface, TuiTitle } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { ReplaySubject, takeUntil } from 'rxjs';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { ConfirmDeleteDialogComponent } from '@components/confirm-delete-dialog/confirm-delete-dialog.component';
import { NoticesApiService } from '@core/services/api/notices-api.service';
import { NoticeActions } from '@store/notices/notice.actions';
import { NoticeFormComponent } from '@pages/notices-page/components/notice-form/notice-form.component';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiFade } from '@taiga-ui/kit';
import { NoticeCardTagsComponent } from '@pages/notices-page/components/notice-card/notice-card-tags/notice-card-tags.component';

@Component({
  selector: 'app-notice-card',
  standalone: true,
  imports: [TuiButton, TuiCardLarge, TuiFade, TuiHeader, TuiSurface, TuiTitle, NoticeCardTagsComponent],
  templateUrl: './notice-card.component.html',
  styleUrl: './notice-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticeCardComponent {
  @Input() notice!: Notice;

  private readonly dialogs = inject(TuiDialogService);
  private readonly injector = inject(INJECTOR);
  private readonly noticesApiService = inject(NoticesApiService);
  private readonly store = inject(Store);
  private readonly destroy$ = new ReplaySubject(1);

  delete() {
    this.dialogs
      .open<boolean>(new PolymorpheusComponent(ConfirmDeleteDialogComponent, this.injector), {
        data: `Notice: ${this.notice.title}`,
        dismissible: false,
        closeable: false,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        if (v) {
          this.noticesApiService.deleteNotice(this.notice.id).subscribe(() => {
            this.store.dispatch(NoticeActions.deleteNotice({ id: this.notice.id }));
          });
        }
      });
  }

  edit(notice: Notice) {
    this.dialogs
      .open<boolean>(new PolymorpheusComponent(NoticeFormComponent, this.injector), {
        data: notice,
        dismissible: false,
        closeable: false,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
