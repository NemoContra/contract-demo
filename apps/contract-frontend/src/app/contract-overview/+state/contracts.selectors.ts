import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CONTRACTS_FEATURE_KEY,
  ContractsState,
  contractsAdapter,
} from './contracts.reducer';

// Lookup the 'Contracts' feature state managed by NgRx
export const getContractsState = createFeatureSelector<ContractsState>(
  CONTRACTS_FEATURE_KEY
);

const { selectAll, selectEntities } = contractsAdapter.getSelectors();

export const getContractsLoaded = createSelector(
  getContractsState,
  (state: ContractsState) => state.loaded
);

export const getContractsError = createSelector(
  getContractsState,
  (state: ContractsState) => state.error
);

export const getAllContracts = createSelector(
  getContractsState,
  (state: ContractsState) => selectAll(state)
);

export const getContractsEntities = createSelector(
  getContractsState,
  (state: ContractsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getContractsState,
  (state: ContractsState) => state.selectedId
);

export const getSelected = createSelector(
  getContractsEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
