import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import fetchBullet from './fetchBullet';
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

describe('fetchBullet', () => {
  let mock;
  let actions;
  let collectionId;
  let bulletId;

  beforeEach(async done => {
    mock = new MockAdapter(bujoy);
    collectionId = 's0m3c0113ct10n1d';
    bulletId = 's0m3bu113t1d';
    const mockResponse = fixtures.bulletResponse;
    mock
      .onGet(`/collection/${collectionId}/bullet/${bulletId}`)
      .reply(200, mockResponse);

    actions = await getAsyncActions(fetchBullet, [collectionId, bulletId]);
    done();
  });

  it('successfully fetches a single collection', () => {
    const expectedActions = [
      { type: types.FETCH_BULLET_REQUEST, bulletId },
      {
        ...fixtures.bulletResponseNormalized,
        type: types.FETCH_BULLET_SUCCESS,
        bulletId
      }
    ];

    expect(actions).toEqual(expectedActions);
  });

  it('handles a low level network error', async () => {
    mock.onGet(`/collection/${collectionId}/bullet/${bulletId}`).networkError();
    actions = await getAsyncActions(fetchBullet, [collectionId, bulletId]);

    const expectedActions = [
      { type: types.FETCH_BULLET_REQUEST, bulletId },
      {
        type: types.FETCH_BULLET_FAILURE,
        bulletId,
        error: 'Network Error'
      }
    ];

    expect(actions).toEqual(expectedActions);
  });

  it('handles a network timeout', async () => {
    mock.onGet(`/collection/${collectionId}/bullet/${bulletId}`).timeout();
    actions = await getAsyncActions(fetchBullet, [collectionId, bulletId]);

    const expectedActions = [
      { type: types.FETCH_BULLET_REQUEST, bulletId },
      {
        type: types.FETCH_BULLET_FAILURE,
        bulletId,
        error: 'timeout of 0ms exceeded'
      }
    ];

    expect(actions).toEqual(expectedActions);
  });
});
