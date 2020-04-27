import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import createBullet from './createBullet';
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

describe('createBullet', () => {
  let mock;
  let actions;
  let collectionId = 's0m3c0113ct10n1d';
  let parentId = 's0m3bu113t1d';
  let formData = {
    text: 'some bullet text',
    type: 'task'
  };

  beforeEach(async done => {
    mock = new MockAdapter(bujoy);
    const mockResponse = fixtures.bulletResponse;
    mock.onPost(`/collection/${collectionId}/bullet`).reply(201, mockResponse);
    mock
      .onPost(`/collection/${collectionId}/bullet/${parentId}`)
      .reply(201, mockResponse);

    actions = await getAsyncActions(createBullet, [collectionId, formData]);
    done();
  });

  it('successfully creates a bullet', () => {
    var parentId = collectionId;
    const expectedActions = [
      { type: types.CREATE_BULLET_REQUEST, parentId },
      {
        ...fixtures.bulletResponseNormalized,
        type: types.CREATE_BULLET_SUCCESS,
        parentId
      }
    ];

    expect(actions).toEqual(expectedActions);
  });

  it('successfully creates a nested bullet', async () => {
    actions = await getAsyncActions(createBullet, [
      collectionId,
      formData,
      parentId
    ]);
    const expectedActions = [
      { type: types.CREATE_BULLET_REQUEST, parentId },
      {
        ...fixtures.bulletResponseNormalized,
        type: types.CREATE_BULLET_SUCCESS,
        parentId
      }
    ];

    expect(actions).toEqual(expectedActions);
  });

  it('handles a low level network error', async () => {
    var parentId = collectionId;
    mock.onPost(`/collection/${collectionId}/bullet`).networkError();
    actions = await getAsyncActions(createBullet, [collectionId, formData]);

    const expectedActions = [
      { type: types.CREATE_BULLET_REQUEST, parentId },
      {
        type: types.CREATE_BULLET_FAILURE,
        parentId,
        error: 'Network Error'
      }
    ];

    expect(actions).toEqual(expectedActions);
  });

  it('handles a network timeout', async () => {
    var parentId = collectionId;
    mock.onPost(`/collection/${collectionId}/bullet`).timeout();
    actions = await getAsyncActions(createBullet, [collectionId, formData]);

    const expectedActions = [
      { type: types.CREATE_BULLET_REQUEST, parentId },
      {
        type: types.CREATE_BULLET_FAILURE,
        parentId,
        error: 'timeout of 0ms exceeded'
      }
    ];

    expect(actions).toEqual(expectedActions);
  });
});
