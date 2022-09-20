import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { ContractActions } from './contracts.actions';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ContractFilterQuery,
  FilterResult,
} from '@contract-demo/api-interfaces';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContractsEffects {
  filterContracts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContractActions.get),
      switchMap(({ filterQuery }: { filterQuery?: ContractFilterQuery }) => {
        let filterParams: HttpParams;

        if (filterQuery?.term) {
          filterParams = new HttpParams().set('term', filterQuery.term);
        }

        return this.httpClient
          .get<FilterResult>('/api/contracts', { params: filterParams })
          .pipe(
            map((response) =>
              ContractActions.success({ filterResult: response })
            ),
            catchError((error) =>
              of(ContractActions.error({ errorCode: error.status }))
            )
          );
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly httpClient: HttpClient
  ) {}
}
