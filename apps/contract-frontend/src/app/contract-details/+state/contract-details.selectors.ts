import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CONTRACT_DETAILS_FEATURE_KEY, ContractDetailsState } from './contract-details.reducer';

export const getContractDetailsState = createFeatureSelector<ContractDetailsState>(
  CONTRACT_DETAILS_FEATURE_KEY
);

export const getContractDetailsLoading = createSelector(
  getContractDetailsState,
  (state: ContractDetailsState) => state.loading
);

export const getContractDetailsError = createSelector(
  getContractDetailsState,
  (state: ContractDetailsState) => state.error
);

export const getContractDetailsData = createSelector(
  getContractDetailsState,
  (state: ContractDetailsState) => state.data
);
