import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ContractActions } from './contracts.actions';
import { ContractFilterQuery } from '@contract-demo/api-interfaces';
import {
  getAllContracts,
  getContractsError,
  getContractsLoading,
} from './contracts.selectors';

@Injectable({
  providedIn: 'root',
})
export class ContractsFacade {
  loading$ = this.store.select(getContractsLoading);
  allContracts$ = this.store.select(getAllContracts);
  getContractsError$ = this.store.select(getContractsError);

  constructor(private readonly store: Store) {}

  getContracts(filterQuery?: ContractFilterQuery): void {
    this.store.dispatch(ContractActions.get({ filterQuery }));
  }
}
