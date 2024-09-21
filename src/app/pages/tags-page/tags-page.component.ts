import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tags-page',
  standalone: true,
  imports: [],
  templateUrl: './tags-page.component.html',
  styleUrl: './tags-page.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsPageComponent {

}
