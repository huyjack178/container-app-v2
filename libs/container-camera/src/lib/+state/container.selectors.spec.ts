import { ContainerEntity } from './container.models';
import {
  containerAdapter,
  ContainerPartialState,
  initialContainerState,
} from './container.reducer';
import * as ContainerSelectors from './container.selectors';

describe('Container Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getContainerId = (it: ContainerEntity) => it.id;
  const createContainerEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ContainerEntity);

  let state: ContainerPartialState;

  beforeEach(() => {
    state = {
      container: containerAdapter.setAll(
        [
          createContainerEntity('PRODUCT-AAA'),
          createContainerEntity('PRODUCT-BBB'),
          createContainerEntity('PRODUCT-CCC'),
        ],
        {
          ...initialContainerState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Container Selectors', () => {
    it('getAllContainer() should return the list of Container', () => {
      const results = ContainerSelectors.getAllContainer(state);
      const selId = getContainerId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ContainerSelectors.getSelected(state) as ContainerEntity;
      const selId = getContainerId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getContainerLoaded() should return the current "loaded" status', () => {
      const result = ContainerSelectors.getContainerLoaded(state);

      expect(result).toBe(true);
    });

    it('getContainerError() should return the current "error" state', () => {
      const result = ContainerSelectors.getContainerError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
