import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { ContractActions } from './contracts.actions';
import { ContractFilterQuery } from '@contract-demo/api-interfaces';
import { getAllContracts, getContractsError, getContractsLoaded, getTotalElements } from './contracts.selectors';

@Injectable()
export class ContractsFacade {
  loaded$ = this.store.pipe(select(getContractsLoaded));
  allContracts$ = this.store.pipe(select(getAllContracts));
  totalElements$ = this.store.pipe(select(getTotalElements));
  getContractsError$ = this.store.pipe(select(getContractsError));

  constructor(private readonly store: Store) {
  }

  getContracts(filterQuery?: ContractFilterQuery) {
    this.store.dispatch(ContractActions.get({ filterQuery }));
  }
}
