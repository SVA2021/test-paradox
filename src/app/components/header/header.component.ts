import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiTabs } from '@taiga-ui/kit';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiIconPipe } from '@taiga-ui/core';

type RouteLink = 'notices' | 'tags' | 'reminders';

interface RouteItem {
  id: RouteLink;
  icon: string;
  title: string;
}

const ROUTES: RouteItem[] = [
  {
    id: 'notices',
    icon: '@tui.notebook-pen',
    title: 'Notices',
  },
  {
    id: 'reminders',
    icon: '@tui.bell-ring',
    title: 'Reminders',
  },
  {
    id: 'tags',
    icon: '@tui.tag',
    title: 'Tags',
  },
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TuiTabs, RouterLink, RouterLinkActive, TuiIconPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly routes = ROUTES;
}
