import { normalize } from 'normalizr';
import * as types from '../types';
import { bujoy } from '../../api';
import { bullet } from '../schemas';

function resetTaskRequest(bulletId) {
  return {
    type: types.RESET_TASK_REQUEST,
    bulletId
  };
}

function resetTaskSuccess(bulletId, data) {
  const { entities } = normalizeData(data);

  return {
    type: types.RESET_TASK_SUCCESS,
    bulletId,
    entities
  };
}

function resetTaskFailure(bulletId, error) {
  return {
    type: types.RESET_TASK_FAILURE,
    bulletId,
    error
  };
}

function normalizeData(data) {
  return normalize(data, bullet);
}

export default function resetTask(collectionId, bulletId, data) {
  return dispatch => {
    dispatch(resetTaskRequest(bulletId));
    return bujoy
      .post(`/collection/${collectionId}/bullet/${bulletId}/reset`, data)
      .then(res => dispatch(resetTaskSuccess(bulletId, res.data)))
      .catch(error => dispatch(resetTaskFailure(bulletId, error.message)));
  };
}
