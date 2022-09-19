import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as ContractsActions from './contracts.actions';
import * as ContractsFeature from './contracts.reducer';
import * as ContractsSelectors from './contracts.selectors';

@Injectable()
export class ContractsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ContractsSelectors.getContractsLoaded));
  allContracts$ = this.store.pipe(select(ContractsSelectors.getAllContracts));
  selectedContracts$ = this.store.pipe(select(ContractsSelectors.getSelected));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ContractsActions.initContracts());
  }
}
