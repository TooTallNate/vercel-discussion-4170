import { normalize } from 'normalizr';
import * as types from '../types';
import { bujoy } from '../../api';
import { collection } from '../schemas';

export function fetchCollectionInit(collectionId) {
  return {
    type: types.FETCH_COLLECTION_INIT,
    collectionId
  };
}

function fetchCollectionRequest(collectionId) {
  return {
    type: types.FETCH_COLLECTION_REQUEST,
    collectionId
  };
}

function fetchCollectionSuccess(collectionId, data) {
  const { entities } = normalizeData(data);

  return {
    type: types.FETCH_COLLECTION_SUCCESS,
    collectionId,
    entities
  };
}

function fetchCollectionFailure(collectionId, error) {
  return {
    type: types.FETCH_COLLECTION_FAILURE,
    collectionId,
    error
  };
}

function normalizeData(data) {
  return normalize(data, collection);
}

export default function fetchCollection(collectionId) {
  return dispatch => {
    dispatch(fetchCollectionRequest(collectionId));
    return bujoy
      .get(`/collection/${collectionId}`)
      .then(res => dispatch(fetchCollectionSuccess(collectionId, res.data)))
      .catch(error =>
        dispatch(fetchCollectionFailure(collectionId, error.message))
      );
  };
}
