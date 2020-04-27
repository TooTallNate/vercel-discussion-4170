import updateBulletReducer from './updateBulletReducer';
import * as types from '../../actions/types';

describe('updateBulletReducer', () => {
  it('should return the initial state', () => {
    expect(updateBulletReducer(undefined, {})).toEqual({});
  });

  describe('should handle UPDATE_BULLET', () => {
    let bulletId = 's0m3bu113t1d';

    it('should initiate a UPDATE_BULLET request', () => {
      const state = updateBulletReducer(
        {},
        {
          type: types.UPDATE_BULLET_REQUEST,
          bulletId
        }
      );
      expect(state[bulletId].isFetching).toEqual(true);
      expect(state[bulletId].error).toEqual(null);
    });

    it('should handle a UPDATE_BULLET request error', () => {
      const error = Error('There was an error');
      const state = updateBulletReducer(
        {},
        {
          type: types.UPDATE_BULLET_FAILURE,
          bulletId,
          error
        }
      );
      expect(state[bulletId].isFetching).toEqual(false);
      expect(state[bulletId].error).toEqual(error);
    });

    it('should handle a UPDATE_BULLET request success', () => {
      const state = updateBulletReducer(
        {},
        {
          type: types.UPDATE_BULLET_SUCCESS,
          bulletId
        }
      );
      expect(state[bulletId].isFetching).toEqual(false);
      expect(state[bulletId].error).toEqual(null);
    });
  });
});
