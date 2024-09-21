import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiButton, TuiDialogContext, TuiTitle } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { TuiHeader } from '@taiga-ui/layout';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [TuiButton, TuiHeader, TuiTitle, NgIf],
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrl: './confirm-delete-dialog.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDeleteDialogComponent {
  private readonly context = injectContext<TuiDialogContext<boolean, string>>();

  protected get content() {
    return this.context.data;
  }

  cancel() {
    this.context.completeWith(false);
  }

  confirm() {
    this.context.completeWith(true);
  }
}
