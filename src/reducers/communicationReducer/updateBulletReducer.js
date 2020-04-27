import * as types from '../../actions/types';

const initialState = {};

export default function updateBulletReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_BULLET_REQUEST:
      return { ...state, [action.bulletId]: { isFetching: true, error: null } };
    case types.UPDATE_BULLET_SUCCESS:
      return {
        ...state,
        [action.bulletId]: { isFetching: false, error: null }
      };
    case types.UPDATE_BULLET_FAILURE:
      return {
        ...state,
        [action.bulletId]: { isFetching: false, error: action.error }
      };
    default:
      return state;
  }
}
