import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nx/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ContractsActions from './contracts.actions';
import { ContractsEffects } from './contracts.effects';

describe('ContractsEffects', () => {
  let actions: Observable<Action>;
  let effects: ContractsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ContractsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ContractsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ContractsActions.initContracts() });

      const expected = hot('-a-|', {
        a: ContractsActions.loadContractsSuccess({ contracts: [] }),
      });

      expect(effects.filterContracts$).toBeObservable(expected);
    });
  });
});
