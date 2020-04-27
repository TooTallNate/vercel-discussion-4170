import migrateTaskReducer from './migrateTaskReducer';
import * as types from '../../actions/types';

describe('migrateTaskReducer', () => {
  it('should return the initial state', () => {
    expect(migrateTaskReducer(undefined, {})).toEqual({});
  });

  describe('should handle MIGRATE_TASK', () => {
    let bulletId = 's0m3bu113t1d';

    it('should initiate a MIGRATE_TASK request', () => {
      const state = migrateTaskReducer(
        {},
        {
          type: types.MIGRATE_TASK_REQUEST,
          bulletId
        }
      );
      expect(state[bulletId].isFetching).toEqual(true);
      expect(state[bulletId].error).toEqual(null);
    });

    it('should handle a MIGRATE_TASK request error', () => {
      const error = Error('There was an error');
      const state = migrateTaskReducer(
        {},
        {
          type: types.MIGRATE_TASK_FAILURE,
          bulletId,
          error
        }
      );
      expect(state[bulletId].isFetching).toEqual(false);
      expect(state[bulletId].error).toEqual(error);
    });

    it('should handle a MIGRATE_TASK request success', () => {
      const state = migrateTaskReducer(
        {},
        {
          type: types.MIGRATE_TASK_SUCCESS,
          bulletId
        }
      );
      expect(state[bulletId].isFetching).toEqual(false);
      expect(state[bulletId].error).toEqual(null);
    });
  });
});
