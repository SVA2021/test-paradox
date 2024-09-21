import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiLoader } from '@taiga-ui/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [TuiLoader],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {}
