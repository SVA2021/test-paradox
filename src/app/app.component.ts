import { TuiRoot } from '@taiga-ui/core';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { Store } from '@ngrx/store';
import { TagActions } from '@store/tags/tag.actions';
import { NoticeActions } from '@store/notices/notice.actions';
import { ReminderActions } from '@store/reminders/reminder.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRoot, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent implements OnInit {
  title = 'test-paradox';
  private readonly store = inject(Store);

  ngOnInit() {
    this.store.dispatch(NoticeActions.fetchNotices());
    this.store.dispatch(ReminderActions.fetchReminders());
    this.store.dispatch(TagActions.fetchTags());
  }
}
