import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { TagsApiService } from '@core/services/api/tags-api.service';
import { TagActions } from '@store/tags/tag.actions';

@Injectable()
export class TagsEffects {
  actions$ = inject(Actions);
  tagsApiService = inject(TagsApiService);

  fetchTags$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TagActions.fetchTags),
      exhaustMap(() =>
        this.tagsApiService.getTags().pipe(
          map((tags) => TagActions.loadTags({ tags })),
          catchError(() => EMPTY),
        ),
      ),
    );
  });
}
