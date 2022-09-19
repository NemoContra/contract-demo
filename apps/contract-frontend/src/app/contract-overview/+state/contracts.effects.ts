import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {fetch} from '@nrwl/angular';

import {ContractActions} from "./contracts.actions";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class ContractsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContractActions.getcontracts),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ContractActions.getcontractsSuccess({result: []});
        },
        onError: (action, error: HttpErrorResponse) => {
          console.error('Error', error);
          return ContractActions.getcontractsFailure({errorCode: error.status});
        },
      })
    )
  );

  constructor(private readonly actions$: Actions, private readonly httpClient: HttpClient) {
  }
}
