import createBulletReducer from './createBulletReducer';
import * as types from '../../actions/types';

describe('createBulletReducer', () => {
  it('should return the initial state', () => {
    expect(createBulletReducer(undefined, {})).toEqual({});
  });

  describe('should handle CREATE_BULLET', () => {
    let parentId = 's0m3bu113t1d';

    it('should initiate a CREATE_BULLET request', () => {
      const state = createBulletReducer(
        {},
        {
          type: types.CREATE_BULLET_REQUEST,
          parentId
        }
      );
      expect(state[parentId].isFetching).toEqual(true);
      expect(state[parentId].error).toEqual(null);
    });

    it('should handle a CREATE_BULLET request error', () => {
      const error = Error('There was an error');
      const state = createBulletReducer(
        {},
        {
          type: types.CREATE_BULLET_FAILURE,
          parentId,
          error
        }
      );
      expect(state[parentId].isFetching).toEqual(false);
      expect(state[parentId].error).toEqual(error);
    });

    it('should handle a CREATE_BULLET request success', () => {
      const state = createBulletReducer(
        {},
        {
          type: types.CREATE_BULLET_SUCCESS,
          parentId
        }
      );
      expect(state[parentId].isFetching).toEqual(false);
      expect(state[parentId].error).toEqual(null);
    });
  });
});
