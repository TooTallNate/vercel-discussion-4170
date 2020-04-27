import fetchBulletReducer from './fetchBulletReducer';
import * as types from '../../actions/types';

describe('fetchBulletReducer', () => {
  it('should return the initial state', () => {
    expect(fetchBulletReducer(undefined, {})).toEqual({});
  });

  describe('should handle FETCH_BULLET', () => {
    let bulletId = 's0m3bu113t1d';

    it('should initiate a FETCH_BULLET request', () => {
      const state = fetchBulletReducer(
        {},
        {
          type: types.FETCH_BULLET_REQUEST,
          bulletId
        }
      );
      expect(state[bulletId].isFetching).toEqual(true);
      expect(state[bulletId].error).toEqual(null);
    });

    it('should handle a FETCH_BULLET request error', () => {
      const error = Error('There was an error');
      const state = fetchBulletReducer(
        {},
        {
          type: types.FETCH_BULLET_FAILURE,
          bulletId,
          error
        }
      );
      expect(state[bulletId].isFetching).toEqual(false);
      expect(state[bulletId].error).toEqual(error);
    });

    it('should handle a FETCH_BULLET request success', () => {
      const state = fetchBulletReducer(
        {},
        {
          type: types.FETCH_BULLET_SUCCESS,
          bulletId
        }
      );
      expect(state[bulletId].isFetching).toEqual(false);
      expect(state[bulletId].error).toEqual(null);
    });
  });
});
