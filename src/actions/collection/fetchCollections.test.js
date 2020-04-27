import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import fetchCollections from './fetchCollections';
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

describe('fetchCollections', () => {
  let mock;
  let actions;

  beforeEach(async done => {
    mock = new MockAdapter(bujoy);
    const mockResponse = fixtures.collectionsResponse;
    mock.onGet('/collection').reply(200, mockResponse);

    actions = await getAsyncActions(fetchCollections);
    done();
  });

  it('successfully fetches a list of collections', () => {
    const expectedActions = [
      { type: types.FETCH_COLLECTIONS_REQUEST },
      {
        ...fixtures.collectionsResponseNormalized,
        type: types.FETCH_COLLECTIONS_SUCCESS
      }
    ];

    expect(actions).toEqual(expectedActions);
  });

  it('handles a low level network error', async () => {
    mock.onGet('/collection').networkError();
    actions = await getAsyncActions(fetchCollections);

    const expectedActions = [
      { type: types.FETCH_COLLECTIONS_REQUEST },
      {
        type: types.FETCH_COLLECTIONS_FAILURE,
        error: 'Network Error'
      }
    ];

    expect(actions).toEqual(expectedActions);
  });

  it('handles a network timeout', async () => {
    mock.onGet('/collection').timeout();
    actions = await getAsyncActions(fetchCollections);

    const expectedActions = [
      { type: types.FETCH_COLLECTIONS_REQUEST },
      {
        type: types.FETCH_COLLECTIONS_FAILURE,
        error: 'timeout of 0ms exceeded'
      }
    ];

    expect(actions).toEqual(expectedActions);
  });
});
