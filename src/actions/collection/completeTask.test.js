import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import completeTask from './completeTask';
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

describe('completeTask', () => {
  let mock;
  let actions;
  let collectionId = 's0m3c0113ct10n1d';
  let bulletId = 's0m3bu113t1d';

  beforeEach(async done => {
    mock = new MockAdapter(bujoy);
    const mockResponse = fixtures.taskCompletedResponse;
    mock
      .onPost(`/collection/${collectionId}/bullet/${bulletId}/complete`)
      .reply(200, mockResponse);

    actions = await getAsyncActions(completeTask, [collectionId, bulletId]);
    done();
  });

  it('successfully marks a task as completed', () => {
    const expectedActions = [
      { type: types.COMPLETE_TASK_REQUEST, bulletId },
      {
        ...fixtures.taskCompletedResponseNormalized,
        type: types.COMPLETE_TASK_SUCCESS,
        bulletId
      }
    ];

    expect(actions).toEqual(expectedActions);
  });

  it('handles a low level network error', async () => {
    mock
      .onPost(`/collection/${collectionId}/bullet/${bulletId}/complete`)
      .networkError();
    actions = await getAsyncActions(completeTask, [collectionId, bulletId]);

    const expectedActions = [
      { type: types.COMPLETE_TASK_REQUEST, bulletId },
      {
        type: types.COMPLETE_TASK_FAILURE,
        bulletId,
        error: 'Network Error'
      }
    ];

    expect(actions).toEqual(expectedActions);
  });

  it('handles a network timeout', async () => {
    mock
      .onPost(`/collection/${collectionId}/bullet/${bulletId}/complete`)
      .timeout();
    actions = await getAsyncActions(completeTask, [collectionId, bulletId]);

    const expectedActions = [
      { type: types.COMPLETE_TASK_REQUEST, bulletId },
      {
        type: types.COMPLETE_TASK_FAILURE,
        bulletId,
        error: 'timeout of 0ms exceeded'
      }
    ];

    expect(actions).toEqual(expectedActions);
  });
});
