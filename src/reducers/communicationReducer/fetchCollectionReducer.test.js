import fetchCollectionReducer from './fetchCollectionReducer';
import * as types from '../../actions/types';

describe('fetchCollectionReducer', () => {
  it('should return the initial state', () => {
    expect(fetchCollectionReducer(undefined, {})).toEqual({
      isFetching: false,
      error: null
    });
  });

  describe('should handle FETCH_COLLECTION', () => {
    it('should initiate a FETCH_COLLECTION request', () => {
      const state = fetchCollectionReducer(
        {},
        {
          type: types.FETCH_COLLECTION_REQUEST
        }
      );
      expect(state.isFetching).toEqual(true);
      expect(state.error).toEqual(null);
    });

    it('should handle a FETCH_COLLECTION request error', () => {
      const error = Error('There was an error');
      const state = fetchCollectionReducer(
        {},
        {
          type: types.FETCH_COLLECTION_FAILURE,
          error
        }
      );
      expect(state.isFetching).toEqual(false);
      expect(state.error).toEqual(error);
    });

    it('should handle a FETCH_COLLECTION request success', () => {
      const state = fetchCollectionReducer(
        {},
        {
          type: types.FETCH_COLLECTION_SUCCESS
        }
      );
      expect(state.isFetching).toEqual(false);
      expect(state.error).toEqual(null);
    });
  });
});
