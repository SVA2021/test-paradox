import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-notices-page',
  standalone: true,
  imports: [],
  templateUrl: './notices-page.component.html',
  styleUrl: './notices-page.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticesPageComponent {}
