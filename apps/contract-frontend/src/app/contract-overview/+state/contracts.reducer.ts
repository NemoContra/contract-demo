import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ContractsActions from './contracts.actions';
import { ContractsEntity } from './contracts.models';

export const CONTRACTS_FEATURE_KEY = 'contracts';

export interface ContractsState extends EntityState<ContractsEntity> {
  selectedId?: string | number; // which Contracts record has been selected
  loaded: boolean; // has the Contracts list been loaded
  error?: string | null; // last known error (if any)
}

export interface ContractsPartialState {
  readonly [CONTRACTS_FEATURE_KEY]: ContractsState;
}

export const contractsAdapter: EntityAdapter<ContractsEntity> =
  createEntityAdapter<ContractsEntity>();

export const initialContractsState: ContractsState =
  contractsAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialContractsState,
  on(ContractsActions.initContracts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ContractsActions.loadContractsSuccess, (state, { contracts }) =>
    contractsAdapter.setAll(contracts, { ...state, loaded: true })
  ),
  on(ContractsActions.loadContractsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function contractsReducer(
  state: ContractsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
