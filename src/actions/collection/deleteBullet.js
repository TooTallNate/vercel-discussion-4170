import { normalize } from 'normalizr';
import * as types from '../types';
import { bujoy } from '../../api';
import { collection } from '../schemas';

function deleteBulletRequest(bulletId) {
  return {
    type: types.DELETE_BULLET_REQUEST,
    bulletId
  };
}

function deleteBulletSuccess(bulletId, data) {
  const { entities } = normalizeData(data);

  return {
    type: types.DELETE_BULLET_SUCCESS,
    bulletId,
    entities: {
      ...entities,
      bullets: { ...entities.bullets, [bulletId]: undefined }
    }
  };
}

function deleteBulletFailure(bulletId, error) {
  return {
    type: types.DELETE_BULLET_FAILURE,
    bulletId,
    error
  };
}

function normalizeData(data) {
  return normalize(data, collection);
}

export default function deleteBullet(collectionId, bulletId) {
  return dispatch => {
    dispatch(deleteBulletRequest(bulletId));
    return bujoy
      .delete(`/collection/${collectionId}/bullet/${bulletId}`)
      .then(res => dispatch(deleteBulletSuccess(bulletId, res.data)))
      .catch(error => dispatch(deleteBulletFailure(bulletId, error.message)));
  };
}
