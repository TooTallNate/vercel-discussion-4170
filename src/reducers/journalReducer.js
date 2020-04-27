import * as types from '../actions/types';

const initialState = {
  daily_log: '',
  monthly_log: {
    anytime: '',
    days: []
  },
  future_log: {
    anytime: '',
    days: [],
    months: []
  }
};

export default function journalReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        daily_log: action.journal.daily_log,
        monthly_log: {
          anytime: action.journal.monthly_log.anytime,
          days: action.journal.monthly_log.days
        },
        future_log: {
          anytime: action.journal.future_log.anytime,
          days: action.journal.future_log.days,
          months: action.journal.future_log.months
        }
      };
    default:
      return state;
  }
}
