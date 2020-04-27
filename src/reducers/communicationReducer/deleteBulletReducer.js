import * as types from '../../actions/types';

const initialState = {};

export default function deleteBulletReducer(state = initialState, action) {
  switch (action.type) {
    case types.DELETE_BULLET_REQUEST:
      return { ...state, [action.bulletId]: { isFetching: true, error: null } };
    case types.DELETE_BULLET_SUCCESS:
      return {
        ...state,
        [action.bulletId]: { isFetching: false, error: null }
      };
    case types.DELETE_BULLET_FAILURE:
      return {
        ...state,
        [action.bulletId]: { isFetching: false, error: action.error }
      };
    default:
      return state;
  }
}
