import * as types from '../../actions/types';

const initialState = {};

export default function scheduleTaskReducer(state = initialState, action) {
  switch (action.type) {
    case types.SCHEDULE_TASK_REQUEST:
      return { ...state, [action.bulletId]: { isFetching: true, error: null } };
    case types.SCHEDULE_TASK_SUCCESS:
      return {
        ...state,
        [action.bulletId]: { isFetching: false, error: null }
      };
    case types.SCHEDULE_TASK_FAILURE:
      return {
        ...state,
        [action.bulletId]: { isFetching: false, error: action.error }
      };
    default:
      return state;
  }
}
