import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { ContractDetailsActions } from './contract-details.actions';
import { HttpClient } from '@angular/common/http';
import { GroupcontractOverviewData } from '@contract-demo/api-interfaces';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContractDetailsEffects {
  contractDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContractDetailsActions.get),
      switchMap(() =>
        this.httpClient
          .get<GroupcontractOverviewData>('/api/contract-details')
          .pipe(
            map((response) =>
              ContractDetailsActions.success({data: response})
            ),
            catchError((error) =>
              of(ContractDetailsActions.error({errorCode: error.status}))
            )
          ))
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly httpClient: HttpClient
  ) {}
}
