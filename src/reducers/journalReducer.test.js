import journalReducer from './journalReducer';
import * as types from '../actions/types';

describe('journalReducer', () => {
  it('should return the initial state', () => {
    expect(journalReducer(undefined, {})).toEqual({
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
    });
  });

  describe('should handle FETCH_COLLECTIONS', () => {
    it('should handle a FETCH_COLLECTIONS request success', () => {
      const journal = {
        daily_log: '1',
        monthly_log: {
          anytime: '2',
          days: ['3', '4']
        },
        future_log: {
          anytime: '4',
          days: ['6', '7'],
          months: ['8', '9', '10']
        }
      };
      const state = journalReducer(
        {},
        {
          type: types.FETCH_COLLECTIONS_SUCCESS,
          journal
        }
      );
      expect(state.daily_log).toEqual(journal.daily_log);
      expect(state.monthly_log).toEqual(journal.monthly_log);
      expect(state.future_log).toEqual(journal.future_log);
    });
  });
});
