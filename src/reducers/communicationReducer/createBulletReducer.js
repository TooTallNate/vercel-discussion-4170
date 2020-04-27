import * as types from '../../actions/types';

const initialState = {};

export default function createBulletReducer(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_BULLET_REQUEST:
      return { ...state, [action.parentId]: { isFetching: true, error: null } };
    case types.CREATE_BULLET_SUCCESS:
      return {
        ...state,
        [action.parentId]: { isFetching: false, error: null }
      };
    case types.CREATE_BULLET_FAILURE:
      return {
        ...state,
        [action.parentId]: { isFetching: false, error: action.error }
      };
    default:
      return state;
  }
}
