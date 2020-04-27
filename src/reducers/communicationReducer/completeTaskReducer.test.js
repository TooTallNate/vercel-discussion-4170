import completeTaskReducer from './completeTaskReducer';
import * as types from '../../actions/types';

describe('completeTaskReducer', () => {
  it('should return the initial state', () => {
    expect(completeTaskReducer(undefined, {})).toEqual({});
  });

  describe('should handle COMPLETE_TASK', () => {
    let bulletId = 's0m3bu113t1d';

    it('should initiate a COMPLETE_TASK request', () => {
      const state = completeTaskReducer(
        {},
        {
          type: types.COMPLETE_TASK_REQUEST,
          bulletId
        }
      );
      expect(state[bulletId].isFetching).toEqual(true);
      expect(state[bulletId].error).toEqual(null);
    });

    it('should handle a COMPLETE_TASK request error', () => {
      const error = Error('There was an error');
      const state = completeTaskReducer(
        {},
        {
          type: types.COMPLETE_TASK_FAILURE,
          bulletId,
          error
        }
      );
      expect(state[bulletId].isFetching).toEqual(false);
      expect(state[bulletId].error).toEqual(error);
    });

    it('should handle a COMPLETE_TASK request success', () => {
      const state = completeTaskReducer(
        {},
        {
          type: types.COMPLETE_TASK_SUCCESS,
          bulletId
        }
      );
      expect(state[bulletId].isFetching).toEqual(false);
      expect(state[bulletId].error).toEqual(null);
    });
  });
});
