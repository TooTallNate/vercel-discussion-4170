import { normalize } from 'normalizr';
import * as types from '../types';
import { bujoy } from '../../api';
import { bullet } from '../schemas';

function createBulletRequest(parentId) {
  return {
    type: types.CREATE_BULLET_REQUEST,
    parentId
  };
}

function createBulletSuccess(parentId, data) {
  const { entities } = normalizeData(data);

  return {
    type: types.CREATE_BULLET_SUCCESS,
    parentId,
    entities
  };
}

function createBulletFailure(parentId, error) {
  return {
    type: types.CREATE_BULLET_FAILURE,
    parentId,
    error
  };
}

function normalizeData(data) {
  return normalize(data, bullet);
}

export default function createBullet(collectionId, data, parentId) {
  const id = parentId ? parentId : collectionId;
  return dispatch => {
    dispatch(createBulletRequest(id));
    return bujoy
      .post(
        parentId
          ? `/collection/${collectionId}/bullet/${parentId}`
          : `/collection/${collectionId}/bullet`,
        data
      )
      .then(res => dispatch(createBulletSuccess(id, res.data)))
      .catch(error => dispatch(createBulletFailure(id, error.message)));
  };
}
