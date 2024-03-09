import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(private route: ActivatedRoute) {}

  /**
   * Get the value of a query parameter
   * @param param the query parameter to get
   * @returns the value of the query parameter
   */
  getQueryParam(param: string) {
    return this.route.queryParams.pipe(
      switchMap((params) => {
        const id = params[param];
        return id ? of(id) : of('');
      })
    );
  }
}
