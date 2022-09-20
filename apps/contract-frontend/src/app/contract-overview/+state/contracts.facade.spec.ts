import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as ContractsActions from './contracts.actions';
import { ContractsEffects } from './contracts.effects';
import { ContractsFacade } from './contracts.facade';
import { ContractsEntity } from './contracts.models';
import {
  CONTRACTS_FEATURE_KEY,
  ContractsState,
  initialContractsState,
  contractsReducer,
} from './contracts.reducer';
import * as ContractsSelectors from './contracts.selectors';

interface TestSchema {
  contracts: ContractsState;
}

describe('ContractsFacade', () => {
  let facade: ContractsFacade;
  let store: Store<TestSchema>;
  const createContractsEntity = (id: string, name = ''): ContractsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CONTRACTS_FEATURE_KEY, contractsReducer),
          EffectsModule.forFeature([ContractsEffects]),
        ],
        providers: [ContractsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ContractsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allContracts$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allContracts$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadContractsSuccess` to manually update list
     */
    it('allContracts$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allContracts$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ContractsActions.loadContractsSuccess({
          contracts: [
            createContractsEntity('AAA'),
            createContractsEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allContracts$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
