import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-empty-list',
  standalone: true,
  imports: [],
  templateUrl: './empty-list.component.html',
  styleUrl: './empty-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyListComponent {}
