import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { TuiButton, TuiDialogContext, TuiTitle } from '@taiga-ui/core';
import { Tag } from '@core/models/tag.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UuidGeneratorService } from '@core/services/uuid-generator.service';
import { Store } from '@ngrx/store';
import { TagsApiService } from '@core/services/api/tags-api.service';
import { TagActions } from '@store/tags/tag.actions';
import { TuiHeader } from '@taiga-ui/layout';
import {
  TUI_DEFAULT_INPUT_COLORS,
  TuiInputColorModule,
  TuiInputModule,
  TuiTextareaModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';

@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [
    TuiButton,
    TuiHeader,
    TuiTitle,
    ReactiveFormsModule,
    TuiInputColorModule,
    TuiTextareaModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './tag-form.component.html',
  styleUrl: './tag-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagFormComponent implements OnInit {
  private readonly context = injectContext<TuiDialogContext<boolean, Tag | null>>();
  private readonly tagsApiService = inject(TagsApiService);
  private readonly store = inject(Store);
  private readonly uuidService = inject(UuidGeneratorService);

  readonly tagForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]),
    description: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    color: new FormControl<string>('', [Validators.required]),
  });

  isEdit = false;
  protected readonly palette = TUI_DEFAULT_INPUT_COLORS;

  ngOnInit() {
    this.isEdit = !!this.context.data;
    this.setForm();
  }

  closeDialog() {
    this.context.completeWith(false);
  }

  submit() {
    if (this.tagForm.invalid || this.tagForm.pristine) {
      this.tagForm.markAllAsTouched();
      return;
    }
    const body: Tag = {
      id: this.isEdit ? this.context.data.id : this.uuidService.getUUID(),
      name: this.tagForm.value.name as string,
      description: this.tagForm.value.description as string,
      color: this.tagForm.value.color as string,
    };
    if (this.isEdit) {
      this.updateTag(body);
    } else {
      this.createTag(body);
    }
  }

  private createTag(tag: Tag) {
    this.tagsApiService.addTag(tag).subscribe(() => {
      this.store.dispatch(TagActions.addTag({ tag }));
      this.context.completeWith(true);
    });
  }

  private updateTag(tag: Tag) {
    this.tagsApiService.updateTag(tag).subscribe(() => {
      this.store.dispatch(TagActions.updateTag({ tag }));
      this.context.completeWith(true);
    });
  }

  private setForm() {
    if (this.isEdit) {
      this.tagForm.patchValue({
        name: this.context.data.name,
        description: this.context.data.description,
        color: this.context.data.color,
      });
    }
  }
}
