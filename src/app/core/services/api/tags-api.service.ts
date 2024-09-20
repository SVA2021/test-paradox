import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from '@core/models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class TagsApiService {
  private readonly http = inject(HttpClient);

  getTags() {
    return this.http.get<Tag[]>('@api/tags');
  }

  addTag(tag: Tag) {
    return this.http.post('@api/tags', tag);
  }

  updateTag(tag: Tag) {
    return this.http.put('@api/tags/' + tag.id, tag);
  }

  deleteTag(id: string) {
    return this.http.delete('@api/tags/' + id);
  }
}
