import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import updateBullet from './updateBullet';
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

describe('updateBullet', () => {
  let mock;
  let actions;
  let collectionId = 's0m3c0113ct10n1d';
  let bulletId = 's0m3bu113t1d';
  let formData = {
    text: 'some bullet text',
    type: 'task'
  };

  beforeEach(async done => {
    mock = new MockAdapter(bujoy);
    const mockResponse = fixtures.bulletResponse;
    mock
      .onPost(`/collection/${collectionId}/bullet/${bulletId}`)
      .reply(201, mockResponse);

    actions = await getAsyncActions(updateBullet, [
      collectionId,
      bulletId,
      formData
    ]);
    done();
  });

  it('successfully fetches a single collection', () => {
    const expectedActions = [
      { type: types.UPDATE_BULLET_REQUEST, bulletId },
      {
        ...fixtures.bulletResponseNormalized,
        type: types.UPDATE_BULLET_SUCCESS,
        bulletId
      }
    ];

    expect(actions).toEqual(expectedActions);
  });

  it('handles a low level network error', async () => {
    mock
      .onPost(`/collection/${collectionId}/bullet/${bulletId}`)
      .networkError();
    actions = await getAsyncActions(updateBullet, [
      collectionId,
      bulletId,
      formData
    ]);

    const expectedActions = [
      { type: types.UPDATE_BULLET_REQUEST, bulletId },
      {
        type: types.UPDATE_BULLET_FAILURE,
        bulletId,
        error: 'Network Error'
      }
    ];

    expect(actions).toEqual(expectedActions);
  });

  it('handles a network timeout', async () => {
    mock.onPost(`/collection/${collectionId}/bullet/${bulletId}`).timeout();
    actions = await getAsyncActions(updateBullet, [
      collectionId,
      bulletId,
      formData
    ]);

    const expectedActions = [
      { type: types.UPDATE_BULLET_REQUEST, bulletId },
      {
        type: types.UPDATE_BULLET_FAILURE,
        bulletId,
        error: 'timeout of 0ms exceeded'
      }
    ];

    expect(actions).toEqual(expectedActions);
  });
});
