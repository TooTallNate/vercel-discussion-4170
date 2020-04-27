import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import fetchCollection from './fetchCollection';
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

describe('fetchCollection', () => {
  let mock;
  let actions;
  let collectionId;

  beforeEach(async done => {
    mock = new MockAdapter(bujoy);
    const mockResponse = fixtures.collectionResponse;
    mock.onGet(`/collection/${collectionId}`).reply(200, mockResponse);

    actions = await getAsyncActions(fetchCollection);
    done();
  });

  it('successfully fetches a single collection', () => {
    const expectedActions = [
      { type: types.FETCH_COLLECTION_REQUEST },
      {
        ...fixtures.collectionResponseNormalized,
        type: types.FETCH_COLLECTION_SUCCESS
      }
    ];

    expect(actions).toEqual(expectedActions);
  });

  it('handles a low level network error', async () => {
    mock.onGet(`/collection/${collectionId}`).networkError();
    actions = await getAsyncActions(fetchCollection);

    const expectedActions = [
      { type: types.FETCH_COLLECTION_REQUEST },
      {
        type: types.FETCH_COLLECTION_FAILURE,
        error: 'Network Error'
      }
    ];

    expect(actions).toEqual(expectedActions);
  });

  it('handles a network timeout', async () => {
    mock.onGet(`/collection/${collectionId}`).timeout();
    actions = await getAsyncActions(fetchCollection);

    const expectedActions = [
      { type: types.FETCH_COLLECTION_REQUEST },
      {
        type: types.FETCH_COLLECTION_FAILURE,
        error: 'timeout of 0ms exceeded'
      }
    ];

    expect(actions).toEqual(expectedActions);
  });
});
