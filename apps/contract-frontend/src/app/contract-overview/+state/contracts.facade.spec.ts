import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as ContractsActions from './contracts.actions';
import { ContractsEffects } from './contracts.effects';
import { ContractsFacade } from './contracts.facade';
import {
  CONTRACTS_FEATURE_KEY,
  ContractsState,
  contractsReducer,
} from './contracts.reducer';

interface TestSchema {
  contracts: ContractsState;
}

describe('ContractsFacade', () => {
  let facade: ContractsFacade;
  let store: Store<TestSchema>;

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
      let isLoaded = await readFirst(facade.loading$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allContracts$);
      isLoaded = await readFirst(facade.loading$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadContractsSuccess` to manually update list
     */
    it('allContracts$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allContracts$);
      let isLoaded = await readFirst(facade.loading$);

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
      isLoaded = await readFirst(facade.loading$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
