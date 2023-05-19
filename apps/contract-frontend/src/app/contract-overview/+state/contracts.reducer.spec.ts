import { Action } from '@ngrx/store';

import * as ContractsActions from './contracts.actions';
import { ContractsEntity } from './contracts.models';
import {
  ContractsState,
  initialContractsState,
  contractsReducer,
} from './contracts.reducer';

describe('Contracts Reducer', () => {
  const createContractsEntity = (id: string, name = ''): ContractsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Contracts actions', () => {
    it('loadContractsSuccess should return the list of known Contracts', () => {
      const contracts = [
        createContractsEntity('PRODUCT-AAA'),
        createContractsEntity('PRODUCT-zzz'),
      ];
      const action = ContractsActions.getContracts({ contracts });

      const result: ContractsState = contractsReducer(
        initialContractsState,
        action
      );

      expect(result.loading).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = contractsReducer(initialContractsState, action);

      expect(result).toBe(initialContractsState);
    });
  });
});
