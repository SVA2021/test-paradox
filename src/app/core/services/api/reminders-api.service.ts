import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reminder } from '@core/models/reminder.model';

@Injectable({
  providedIn: 'root',
})
export class RemindersApiService {
  private readonly http = inject(HttpClient);

  getReminders() {
    return this.http.get<Reminder[]>('@api/reminders');
  }

  addReminder(reminder: Reminder) {
    return this.http.post('@api/reminders', reminder);
  }

  updateReminder(reminder: Reminder) {
    return this.http.put('@api/reminders/' + reminder.id, reminder);
  }

  deleteReminder(id: string) {
    return this.http.delete('@api/reminders/' + id);
  }
}
