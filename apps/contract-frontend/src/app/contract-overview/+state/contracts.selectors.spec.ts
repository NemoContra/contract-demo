import { ContractsEntity } from './contracts.models';
import {
  contractsAdapter,
  ContractsPartialState,
  initialContractsState,
} from './contracts.reducer';
import * as ContractsSelectors from './contracts.selectors';

describe('Contracts Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getContractsId = (it: ContractsEntity) => it.id;
  const createContractsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ContractsEntity);

  let state: ContractsPartialState;

  beforeEach(() => {
    state = {
      contracts: contractsAdapter.setAll(
        [
          createContractsEntity('PRODUCT-AAA'),
          createContractsEntity('PRODUCT-BBB'),
          createContractsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialContractsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Contracts Selectors', () => {
    it('getAllContracts() should return the list of Contracts', () => {
      const results = ContractsSelectors.getAllContracts(state);
      const selId = getContractsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ContractsSelectors.getSelected(state) as ContractsEntity;
      const selId = getContractsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getContractsLoaded() should return the current "loaded" status', () => {
      const result = ContractsSelectors.getContractsLoading(state);

      expect(result).toBe(true);
    });

    it('getContractsError() should return the current "error" state', () => {
      const result = ContractsSelectors.getContractsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
