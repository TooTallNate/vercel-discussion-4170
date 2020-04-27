import resetTaskReducer from './resetTaskReducer';
import * as types from '../../actions/types';

describe('resetTaskReducer', () => {
  it('should return the initial state', () => {
    expect(resetTaskReducer(undefined, {})).toEqual({});
  });

  describe('should handle RESET_TASK', () => {
    let bulletId = 's0m3bu113t1d';

    it('should initiate a RESET_TASK request', () => {
      const state = resetTaskReducer(
        {},
        {
          type: types.RESET_TASK_REQUEST,
          bulletId
        }
      );
      expect(state[bulletId].isFetching).toEqual(true);
      expect(state[bulletId].error).toEqual(null);
    });

    it('should handle a RESET_TASK request error', () => {
      const error = Error('There was an error');
      const state = resetTaskReducer(
        {},
        {
          type: types.RESET_TASK_FAILURE,
          bulletId,
          error
        }
      );
      expect(state[bulletId].isFetching).toEqual(false);
      expect(state[bulletId].error).toEqual(error);
    });

    it('should handle a RESET_TASK request success', () => {
      const state = resetTaskReducer(
        {},
        {
          type: types.RESET_TASK_SUCCESS,
          bulletId
        }
      );
      expect(state[bulletId].isFetching).toEqual(false);
      expect(state[bulletId].error).toEqual(null);
    });
  });
});
