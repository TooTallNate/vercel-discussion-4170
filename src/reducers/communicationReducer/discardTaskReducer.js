import * as types from '../../actions/types';

const initialState = {};

export default function discardTaskReducer(state = initialState, action) {
  switch (action.type) {
    case types.DISCARD_TASK_REQUEST:
      return { ...state, [action.bulletId]: { isFetching: true, error: null } };
    case types.DISCARD_TASK_SUCCESS:
      return {
        ...state,
        [action.bulletId]: { isFetching: false, error: null }
      };
    case types.DISCARD_TASK_FAILURE:
      return {
        ...state,
        [action.bulletId]: { isFetching: false, error: action.error }
      };
    default:
      return state;
  }
}
