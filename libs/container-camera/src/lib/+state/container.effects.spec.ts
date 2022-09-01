import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ContainerActions from './container.actions';
import { ContainerEffects } from './container.effects';

describe('ContainerEffects', () => {
  let actions: Observable<Action>;
  let effects: ContainerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ContainerEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ContainerEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ContainerActions.initContainer() });

      const expected = hot('-a-|', {
        a: ContainerActions.loadContainerSuccess({ container: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
