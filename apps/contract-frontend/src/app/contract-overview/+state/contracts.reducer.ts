import { createReducer, on, Action } from '@ngrx/store';

import { ContractActions } from './contracts.actions';
import { FilterResult } from '@contract-demo/api-interfaces';

export const CONTRACTS_FEATURE_KEY = 'contracts';

export interface ContractsState {
  filterResult?: FilterResult;
  loaded: boolean;
  error?: number;
}

export interface ContractsPartialState {
  readonly [CONTRACTS_FEATURE_KEY]: ContractsState;
}

export const initialContractsState: ContractsState = {
  loaded: false,
};

const reducer = createReducer(
  initialContractsState,
  on(ContractActions.get, (state) => ({
    ...state,
    filterResult: undefined,
    loaded: false,
    error: undefined,
  })),
  on(ContractActions.success, (state, { filterResult }) => ({
    ...state,
    filterResult,
    loaded: true,
  })),
  on(ContractActions.error, (state, { errorCode }) => ({
    ...state,
    error: errorCode,
    filterResult: undefined,
    loaded: true,
  }))
);

export function contractsReducer(
  state: ContractsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
