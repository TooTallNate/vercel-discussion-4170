import * as types from '../../actions/types';

const initialState = {};

export default function fetchCollectionReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_COLLECTION_INIT:
      return {
        ...state,
        [action.collectionId]: { isFetching: false, error: null }
      };
    case types.FETCH_COLLECTION_REQUEST:
      return {
        ...state,
        [action.collectionId]: { isFetching: true, error: null }
      };
    case types.FETCH_COLLECTION_SUCCESS:
      return {
        ...state,
        [action.collectionId]: {
          isFetching: false,
          error: null
        }
      };
    case types.FETCH_COLLECTION_FAILURE:
      return {
        ...state,
        [action.collectionId]: {
          isFetching: false,
          error: action.error
        }
      };
    default:
      return state;
  }
}
