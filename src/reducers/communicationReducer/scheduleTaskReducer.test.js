import scheduleTaskReducer from './scheduleTaskReducer';
import * as types from '../../actions/types';

describe('scheduleTaskReducer', () => {
  it('should return the initial state', () => {
    expect(scheduleTaskReducer(undefined, {})).toEqual({});
  });

  describe('should handle SCHEDULE_TASK', () => {
    let bulletId = 's0m3bu113t1d';

    it('should initiate a SCHEDULE_TASK request', () => {
      const state = scheduleTaskReducer(
        {},
        {
          type: types.SCHEDULE_TASK_REQUEST,
          bulletId
        }
      );
      expect(state[bulletId].isFetching).toEqual(true);
      expect(state[bulletId].error).toEqual(null);
    });

    it('should handle a SCHEDULE_TASK request error', () => {
      const error = Error('There was an error');
      const state = scheduleTaskReducer(
        {},
        {
          type: types.SCHEDULE_TASK_FAILURE,
          bulletId,
          error
        }
      );
      expect(state[bulletId].isFetching).toEqual(false);
      expect(state[bulletId].error).toEqual(error);
    });

    it('should handle a SCHEDULE_TASK request success', () => {
      const state = scheduleTaskReducer(
        {},
        {
          type: types.SCHEDULE_TASK_SUCCESS,
          bulletId
        }
      );
      expect(state[bulletId].isFetching).toEqual(false);
      expect(state[bulletId].error).toEqual(null);
    });
  });
});
