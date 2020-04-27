import { normalize } from 'normalizr';
import * as types from '../types';
import { bujoy } from '../../api';
import { bullet } from '../schemas';

function discardTaskRequest(bulletId) {
  return {
    type: types.DISCARD_TASK_REQUEST,
    bulletId
  };
}

function discardTaskSuccess(bulletId, data) {
  const { entities } = normalizeData(data);

  return {
    type: types.DISCARD_TASK_SUCCESS,
    bulletId,
    entities
  };
}

function discardTaskFailure(bulletId, error) {
  return {
    type: types.DISCARD_TASK_FAILURE,
    bulletId,
    error
  };
}

function normalizeData(data) {
  return normalize(data, bullet);
}

export default function discardTask(collectionId, bulletId, data) {
  return dispatch => {
    dispatch(discardTaskRequest(bulletId));
    return bujoy
      .post(`/collection/${collectionId}/bullet/${bulletId}/discard`, data)
      .then(res => dispatch(discardTaskSuccess(bulletId, res.data)))
      .catch(error => dispatch(discardTaskFailure(bulletId, error.message)));
  };
}
