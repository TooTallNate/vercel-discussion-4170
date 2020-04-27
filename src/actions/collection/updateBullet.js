import { normalize } from 'normalizr';
import * as types from '../types';
import { bujoy } from '../../api';
import { bullet } from '../schemas';

function updateBulletRequest(bulletId) {
  return {
    type: types.UPDATE_BULLET_REQUEST,
    bulletId
  };
}

function updateBulletSuccess(bulletId, data) {
  const { entities } = normalizeData(data);

  return {
    type: types.UPDATE_BULLET_SUCCESS,
    bulletId,
    entities
  };
}

function updateBulletFailure(bulletId, error) {
  return {
    type: types.UPDATE_BULLET_FAILURE,
    bulletId,
    error
  };
}

function normalizeData(data) {
  return normalize(data, bullet);
}

export default function updateBullet(collectionId, bulletId, data) {
  return dispatch => {
    dispatch(updateBulletRequest(bulletId));
    return bujoy
      .post(`/collection/${collectionId}/bullet/${bulletId}`, data)
      .then(res => dispatch(updateBulletSuccess(bulletId, res.data)))
      .catch(error => dispatch(updateBulletFailure(bulletId, error.message)));
  };
}
