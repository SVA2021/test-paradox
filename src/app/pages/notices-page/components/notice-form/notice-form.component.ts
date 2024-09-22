import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-notice-form',
  standalone: true,
  imports: [],
  templateUrl: './notice-form.component.html',
  styleUrl: './notice-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoticeFormComponent {

}
