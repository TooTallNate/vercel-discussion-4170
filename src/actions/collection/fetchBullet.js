import { normalize } from 'normalizr';
import * as types from '../types';
import { bujoy } from '../../api';
import { bullet } from '../schemas';

function fetchBulletRequest(bulletId) {
  return {
    type: types.FETCH_BULLET_REQUEST,
    bulletId
  };
}

function fetchBulletSuccess(bulletId, data) {
  const { entities } = normalizeData(data);

  return {
    type: types.FETCH_BULLET_SUCCESS,
    bulletId,
    entities
  };
}

function fetchBulletFailure(bulletId, error) {
  return {
    type: types.FETCH_BULLET_FAILURE,
    bulletId,
    error
  };
}

function normalizeData(data) {
  return normalize(data, bullet);
}

export default function fetchBullet(collectionId, bulletId) {
  return dispatch => {
    dispatch(fetchBulletRequest(bulletId));
    return bujoy
      .get(`/collection/${collectionId}/bullet/${bulletId}`)
      .then(res => dispatch(fetchBulletSuccess(bulletId, res.data)))
      .catch(error => dispatch(fetchBulletFailure(bulletId, error.message)));
  };
}
