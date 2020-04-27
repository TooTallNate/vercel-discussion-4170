import { normalize } from 'normalizr';
import * as types from '../types';
import { bujoy } from '../../api';
import { bullet } from '../schemas';

function completeTaskRequest(bulletId) {
  return {
    type: types.COMPLETE_TASK_REQUEST,
    bulletId
  };
}

function completeTaskSuccess(bulletId, data) {
  const { entities } = normalizeData(data);

  return {
    type: types.COMPLETE_TASK_SUCCESS,
    bulletId,
    entities
  };
}

function completeTaskFailure(bulletId, error) {
  return {
    type: types.COMPLETE_TASK_FAILURE,
    bulletId,
    error
  };
}

function normalizeData(data) {
  return normalize(data, bullet);
}

export default function completeTask(collectionId, bulletId, data) {
  return dispatch => {
    dispatch(completeTaskRequest(bulletId));
    return bujoy
      .post(`/collection/${collectionId}/bullet/${bulletId}/complete`, data)
      .then(res => dispatch(completeTaskSuccess(bulletId, res.data)))
      .catch(error => dispatch(completeTaskFailure(bulletId, error.message)));
  };
}
