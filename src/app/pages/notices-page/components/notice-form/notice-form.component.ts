import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { TuiButton, TuiDialogContext, TuiTitle } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { UuidGeneratorService } from '@core/services/uuid-generator.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notice } from '@core/models/notice.model';
import { NoticesApiService } from '@core/services/api/notices-api.service';
import { NoticeActions } from '@store/notices/notice.actions';
import {
  TuiInputModule,
  TuiMultiSelectModule,
  TuiTextareaModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { selectTags } from '@store/tags/tag.selectors';
import { ReplaySubject, takeUntil } from 'rxjs';
import { TuiContext } from '@taiga-ui/cdk';
import { AsyncPipe } from '@angular/common';
import { TuiHeader } from '@taiga-ui/layout';
import { tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { Tag } from '@core/models/tag.model';

@Component({
  selector: 'app-notice-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextareaModule,
    TuiTextfieldControllerModule,
    TuiMultiSelectModule,
    AsyncPipe,
    TuiButton,
    TuiHeader,
    TuiTitle,
  ],
  templateUrl: './notice-form.component.html',
  styleUrl: './notice-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiItemsHandlersProvider({
      identityMatcher: (item1: Tag, item2: Tag) => item1.id === item2.id,
      stringify: (item: Tag | TuiContext<Tag>) => ('name' in item ? `${item.name}` : `${item.$implicit.name}`),
    }),
  ],
})
export class NoticeFormComponent implements OnInit, OnDestroy {
  private readonly context = injectContext<TuiDialogContext<boolean, Notice | null>>();
  private readonly noticesApiService = inject(NoticesApiService);
  private readonly store = inject(Store);
  private readonly uuidService = inject(UuidGeneratorService);
  private readonly destroy$ = new ReplaySubject(1);

  tags$ = this.store.select(selectTags).pipe(takeUntil(this.destroy$));
  tags: Tag[] = [];

  readonly noticeForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]),
    description: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    tags: new FormControl<Tag[]>([], []),
  });

  isEdit = false;

  ngOnInit() {
    this.isEdit = !!this.context.data;
    this.tags$.subscribe((v) => (this.tags = v));
    this.setForm();
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  closeDialog() {
    this.context.completeWith(false);
  }

  submit() {
    if (this.noticeForm.invalid || this.noticeForm.pristine) {
      this.noticeForm.markAllAsTouched();
      return;
    }
    const body: Notice = {
      id: this.isEdit ? this.context.data.id : this.uuidService.getUUID(),
      title: this.noticeForm.value.title as string,
      description: this.noticeForm.value.description as string,
      tags: (this.noticeForm.value.tags || []).map((w) => w.id),
    };
    if (this.isEdit) {
      this.updateNotice(body);
    } else {
      this.createNotice(body);
    }
  }

  private createNotice(notice: Notice) {
    this.noticesApiService.addNotice(notice).subscribe(() => {
      this.store.dispatch(NoticeActions.addNotice({ notice }));
      this.context.completeWith(true);
    });
  }

  private updateNotice(notice: Notice) {
    this.noticesApiService.updateNotice(notice).subscribe(() => {
      this.store.dispatch(NoticeActions.updateNotice({ notice }));
      this.context.completeWith(true);
    });
  }

  private setForm() {
    if (this.isEdit) {
      this.noticeForm.patchValue({
        title: this.context.data.title,
        description: this.context.data.description,
        tags: this.tags.filter((w) => this.context.data.tags.includes(w.id)),
      });
    }
  }
}
