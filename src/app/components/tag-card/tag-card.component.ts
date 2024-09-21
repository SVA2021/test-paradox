import { ChangeDetectionStrategy, Component, inject, INJECTOR, Input } from '@angular/core';
import { Tag } from '@core/models/tag.model';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiButton, TuiDialogService, TuiSurface, TuiTitle } from '@taiga-ui/core';
import { TuiFade } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { ConfirmDeleteDialogComponent } from '@components/confirm-delete-dialog/confirm-delete-dialog.component';
import { Store } from '@ngrx/store';
import { TagActions } from '@store/tags/tag.actions';
import { TagsApiService } from '@core/services/api/tags-api.service';
import { TagFormComponent } from '@components/tag-form/tag-form.component';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tag-card',
  standalone: true,
  imports: [TuiCardLarge, TuiSurface, TuiTitle, TuiHeader, TuiButton, TuiFade],
  templateUrl: './tag-card.component.html',
  styleUrl: './tag-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagCardComponent {
  @Input() tag!: Tag;

  private readonly dialogs = inject(TuiDialogService);
  private readonly injector = inject(INJECTOR);
  private readonly tagsApiService = inject(TagsApiService);
  private readonly store = inject(Store);
  private readonly destroy$ = new ReplaySubject(1);

  deleteTag() {
    this.dialogs
      .open<boolean>(new PolymorpheusComponent(ConfirmDeleteDialogComponent, this.injector), {
        data: `Tag: ${this.tag.name}`,
        dismissible: false,
        closeable: false,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        if (v) {
          this.tagsApiService.deleteTag(this.tag.id).subscribe(() => {
            this.store.dispatch(TagActions.deleteTag({ id: this.tag.id }));
          });
        }
      });
  }

  editTag(tag: Tag) {
    this.dialogs
      .open<boolean>(new PolymorpheusComponent(TagFormComponent, this.injector), {
        data: tag,
        dismissible: false,
        closeable: false,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
