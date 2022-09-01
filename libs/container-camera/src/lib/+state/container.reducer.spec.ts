import { Action } from '@ngrx/store';

import * as ContainerActions from './container.actions';
import { ContainerEntity } from './container.models';
import {
  ContainerState,
  initialContainerState,
  containerReducer,
} from './container.reducer';

describe('Container Reducer', () => {
  const createContainerEntity = (id: string, name = ''): ContainerEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Container actions', () => {
    it('loadContainerSuccess should return the list of known Container', () => {
      const container = [
        createContainerEntity('PRODUCT-AAA'),
        createContainerEntity('PRODUCT-zzz'),
      ];
      const action = ContainerActions.loadContainerSuccess({ container });

      const result: ContainerState = containerReducer(
        initialContainerState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = containerReducer(initialContainerState, action);

      expect(result).toBe(initialContainerState);
    });
  });
});
