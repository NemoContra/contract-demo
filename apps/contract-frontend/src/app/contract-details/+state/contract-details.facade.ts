import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ContractDetailsActions } from './contract-details.actions';
import {
  getContractDetailsData,
  getContractDetailsError,
  getContractDetailsLoading,
} from './contract-details.selectors';

@Injectable({
  providedIn: 'root',
})
export class ContractDetailsFacade {
  contractDetailsData$ = this.store.select(getContractDetailsData);
  getContractDetailsLoading$ = this.store.select(getContractDetailsLoading);
  getContractDetailsError$ = this.store.select(getContractDetailsError);

  constructor(private readonly store: Store) {}

  getContractDetailsData(): void {
    this.store.dispatch(ContractDetailsActions.get());
  }
}
