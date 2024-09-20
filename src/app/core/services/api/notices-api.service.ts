import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notice } from '@core/models/notice.model';

@Injectable({
  providedIn: 'root',
})
export class NoticesApiService {
  private readonly http = inject(HttpClient);

  getNotices() {
    return this.http.get<Notice[]>('@api/notices');
  }

  addNotice(notice: Notice) {
    return this.http.post('@api/notices', notice);
  }

  updateNotice(notice: Notice) {
    return this.http.put('@api/notices/' + notice.id, notice);
  }

  deleteNotice(id: string) {
    return this.http.delete('@api/notices/' + id);
  }
}
