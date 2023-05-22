import { createReducer, on, Action } from '@ngrx/store';

import { ContractDetailsActions } from './contract-details.actions';
import { GroupcontractOverviewData } from '@contract-demo/api-interfaces';

export const CONTRACT_DETAILS_FEATURE_KEY = 'contract-details';

export interface ContractDetailsState {
  data?: GroupcontractOverviewData;
  loading: boolean;
  error?: number;
}

export const initialContractsState: ContractDetailsState = {
  loading: false,
};

const reducer = createReducer(
  initialContractsState,
  on(ContractDetailsActions.get, (state) => ({
    ...state,
    data: undefined,
    loading: true,
    error: undefined,
  })),
  on(ContractDetailsActions.success, (state, { data }) => ({
    ...state,
    data,
    loading: false,
  })),
  on(ContractDetailsActions.error, (state, { errorCode }) => ({
    ...state,
    error: errorCode,
    data: undefined,
    loading: false,
  }))
);

export function contractDetailsReducer(
  state: ContractDetailsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
