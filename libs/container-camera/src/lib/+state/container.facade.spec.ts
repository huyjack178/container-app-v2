import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as ContainerActions from './container.actions';
import { ContainerEffects } from './container.effects';
import { ContainerFacade } from './container.facade';
import { ContainerEntity } from './container.models';
import {
  CONTAINER_FEATURE_KEY,
  ContainerState,
  initialContainerState,
  containerReducer,
} from './container.reducer';
import * as ContainerSelectors from './container.selectors';

interface TestSchema {
  container: ContainerState;
}

describe('ContainerFacade', () => {
  let facade: ContainerFacade;
  let store: Store<TestSchema>;
  const createContainerEntity = (id: string, name = ''): ContainerEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CONTAINER_FEATURE_KEY, containerReducer),
          EffectsModule.forFeature([ContainerEffects]),
        ],
        providers: [ContainerFacade],
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
      facade = TestBed.inject(ContainerFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allContainer$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allContainer$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadContainerSuccess` to manually update list
     */
    it('allContainer$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allContainer$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ContainerActions.loadContainerSuccess({
          container: [
            createContainerEntity('AAA'),
            createContainerEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allContainer$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
