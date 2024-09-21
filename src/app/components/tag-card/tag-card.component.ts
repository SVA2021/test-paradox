import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tag } from '@core/models/tag.model';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiButton, TuiSurface, TuiTitle } from '@taiga-ui/core';
import { TuiFade } from '@taiga-ui/kit';

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
}
