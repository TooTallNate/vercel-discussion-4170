import discardTaskReducer from './discardTaskReducer';
import * as types from '../../actions/types';

describe('discardTaskReducer', () => {
  it('should return the initial state', () => {
    expect(discardTaskReducer(undefined, {})).toEqual({});
  });

  describe('should handle DISCARD_TASK', () => {
    let bulletId = 's0m3bu113t1d';

    it('should initiate a DISCARD_TASK request', () => {
      const state = discardTaskReducer(
        {},
        {
          type: types.DISCARD_TASK_REQUEST,
          bulletId
        }
      );
      expect(state[bulletId].isFetching).toEqual(true);
      expect(state[bulletId].error).toEqual(null);
    });

    it('should handle a DISCARD_TASK request error', () => {
      const error = Error('There was an error');
      const state = discardTaskReducer(
        {},
        {
          type: types.DISCARD_TASK_FAILURE,
          bulletId,
          error
        }
      );
      expect(state[bulletId].isFetching).toEqual(false);
      expect(state[bulletId].error).toEqual(error);
    });

    it('should handle a DISCARD_TASK request success', () => {
      const state = discardTaskReducer(
        {},
        {
          type: types.DISCARD_TASK_SUCCESS,
          bulletId
        }
      );
      expect(state[bulletId].isFetching).toEqual(false);
      expect(state[bulletId].error).toEqual(null);
    });
  });
});
