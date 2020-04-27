import * as types from '../../actions/types';

const initialState = {
  isFetching: false,
  error: null
};

export default function fetchCollectionsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_COLLECTIONS_REQUEST:
      return { ...state, isFetching: true, error: null };
    case types.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null
      };
    case types.FETCH_COLLECTIONS_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
}
