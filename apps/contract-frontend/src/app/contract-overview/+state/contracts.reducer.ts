import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { ContractActions } from './contracts.actions';
import { Contract } from '@contract-demo/api-interfaces';

export const CONTRACTS_FEATURE_KEY = 'contracts';

export interface ContractsState extends EntityState<Contract> {
  contracts?: Contract[];
  totalElements?: number;
  loaded: boolean;
  error?: number;
}

export interface ContractsPartialState {
  readonly [CONTRACTS_FEATURE_KEY]: ContractsState;
}

export const contractsAdapter: EntityAdapter<Contract> = createEntityAdapter<Contract>();

export const initialContractsState: ContractsState =
  contractsAdapter.getInitialState({
    loaded: false,
  });

const reducer = createReducer(
  initialContractsState,
  on(ContractActions.get, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  })),
  on(ContractActions.success, (state, { filterResult }) =>
    contractsAdapter.setAll(filterResult.contracts, {
      ...state,
      totalElements: filterResult.totalElements,
      loaded: true
    })
  ),
  on(ContractActions.error, (state, { errorCode }) => ({
    ...state,
    error: errorCode,
    loaded: true,
    totalElements: 0
  }))
);

export function contractsReducer(
  state: ContractsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
