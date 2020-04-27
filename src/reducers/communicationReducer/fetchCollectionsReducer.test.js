import fetchCollectionsReducer from './fetchCollectionsReducer';
import * as types from '../../actions/types';

describe('fetchCollectionsReducer', () => {
  it('should return the initial state', () => {
    expect(fetchCollectionsReducer(undefined, {})).toEqual({
      isFetching: false,
      error: null
    });
  });

  describe('should handle FETCH_COLLECTIONS', () => {
    it('should initiate a FETCH_COLLECTIONS request', () => {
      const state = fetchCollectionsReducer(
        {},
        {
          type: types.FETCH_COLLECTIONS_REQUEST
        }
      );
      expect(state.isFetching).toEqual(true);
      expect(state.error).toEqual(null);
    });

    it('should handle a FETCH_COLLECTIONS request error', () => {
      const error = Error('There was an error');
      const state = fetchCollectionsReducer(
        {},
        {
          type: types.FETCH_COLLECTIONS_FAILURE,
          error
        }
      );
      expect(state.isFetching).toEqual(false);
      expect(state.error).toEqual(error);
    });

    it('should handle a FETCH_COLLECTIONS request success', () => {
      const state = fetchCollectionsReducer(
        {},
        {
          type: types.FETCH_COLLECTIONS_SUCCESS
        }
      );
      expect(state.isFetching).toEqual(false);
      expect(state.error).toEqual(null);
    });
  });
});
