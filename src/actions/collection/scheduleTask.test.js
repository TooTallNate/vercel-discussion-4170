import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import scheduleTask from './scheduleTask';
import * as types from '../types';
import { bujoy } from '../../api';
import * as fixtures from './fixtures';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const getAsyncActions = async (actionCreator, args = [], state = {}) => {
  const store = mockStore(state);
  await store.dispatch(actionCreator(...args));
  return store.getActions();
};

describe('scheduleTask', () => {
  let mock;
  let actions;
  let collectionId = 's0m3c0113ct10n1d';
  let bulletId = 's0m3bu113t1d';

  beforeEach(async done => {
    mock = new MockAdapter(bujoy);
    const mockResponse = fixtures.taskScheduledResponse;
    mock
      .onPost(`/collection/${collectionId}/bullet/${bulletId}/schedule`)
      .reply(200, mockResponse);

    actions = await getAsyncActions(scheduleTask, [collectionId, bulletId]);
    done();
  });

  it('successfully marks a task as completed', () => {
    const expectedActions = [
      { type: types.SCHEDULE_TASK_REQUEST, bulletId },
      {
        ...fixtures.taskScheduledResponseNormalized,
        type: types.SCHEDULE_TASK_SUCCESS,
        bulletId
      }
    ];

    expect(actions).toEqual(expectedActions);
  });

  it('handles a low level network error', async () => {
    mock
      .onPost(`/collection/${collectionId}/bullet/${bulletId}/schedule`)
      .networkError();
    actions = await getAsyncActions(scheduleTask, [collectionId, bulletId]);

    const expectedActions = [
      { type: types.SCHEDULE_TASK_REQUEST, bulletId },
      {
        type: types.SCHEDULE_TASK_FAILURE,
        bulletId,
        error: 'Network Error'
      }
    ];

    expect(actions).toEqual(expectedActions);
  });

  it('handles a network timeout', async () => {
    mock
      .onPost(`/collection/${collectionId}/bullet/${bulletId}/schedule`)
      .timeout();
    actions = await getAsyncActions(scheduleTask, [collectionId, bulletId]);

    const expectedActions = [
      { type: types.SCHEDULE_TASK_REQUEST, bulletId },
      {
        type: types.SCHEDULE_TASK_FAILURE,
        bulletId,
        error: 'timeout of 0ms exceeded'
      }
    ];

    expect(actions).toEqual(expectedActions);
  });
});
