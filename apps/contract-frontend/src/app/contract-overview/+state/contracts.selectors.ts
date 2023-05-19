import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CONTRACTS_FEATURE_KEY, ContractsState } from './contracts.reducer';

export const getContractsState = createFeatureSelector<ContractsState>(
  CONTRACTS_FEATURE_KEY
);

export const getContractsLoading = createSelector(
  getContractsState,
  (state: ContractsState) => state.loading
);

export const getContractsError = createSelector(
  getContractsState,
  (state: ContractsState) => state.error
);

export const getAllContracts = createSelector(
  getContractsState,
  (state: ContractsState) => state.filterResult
);
