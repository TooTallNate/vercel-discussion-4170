import deleteBulletReducer from './deleteBulletReducer';
import * as types from '../../actions/types';

describe('deleteBulletReducer', () => {
  it('should return the initial state', () => {
    expect(deleteBulletReducer(undefined, {})).toEqual({});
  });

  describe('should handle DELETE_BULLET', () => {
    let bulletId = 's0m3bu113t1d';

    it('should initiate a DELETE_BULLET request', () => {
      const state = deleteBulletReducer(
        {},
        {
          type: types.DELETE_BULLET_REQUEST,
          bulletId
        }
      );
      expect(state[bulletId].isFetching).toEqual(true);
      expect(state[bulletId].error).toEqual(null);
    });

    it('should handle a DELETE_BULLET request error', () => {
      const error = Error('There was an error');
      const state = deleteBulletReducer(
        {},
        {
          type: types.DELETE_BULLET_FAILURE,
          bulletId,
          error
        }
      );
      expect(state[bulletId].isFetching).toEqual(false);
      expect(state[bulletId].error).toEqual(error);
    });

    it('should handle a DELETE_BULLET request success', () => {
      const state = deleteBulletReducer(
        {},
        {
          type: types.DELETE_BULLET_SUCCESS,
          bulletId
        }
      );
      expect(state[bulletId].isFetching).toEqual(false);
      expect(state[bulletId].error).toEqual(null);
    });
  });
});
