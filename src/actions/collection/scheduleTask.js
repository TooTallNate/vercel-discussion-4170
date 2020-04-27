import { normalize } from 'normalizr';
import * as types from '../types';
import { bujoy } from '../../api';
import { bullet } from '../schemas';

function scheduleTaskRequest(bulletId) {
  return {
    type: types.SCHEDULE_TASK_REQUEST,
    bulletId
  };
}

function scheduleTaskSuccess(bulletId, data) {
  const { entities } = normalizeData(data);

  return {
    type: types.SCHEDULE_TASK_SUCCESS,
    bulletId,
    entities
  };
}

function scheduleTaskFailure(bulletId, error) {
  return {
    type: types.SCHEDULE_TASK_FAILURE,
    bulletId,
    error
  };
}

function normalizeData(data) {
  return normalize(data, bullet);
}

export default function scheduleTask(collectionId, bulletId, data) {
  return dispatch => {
    dispatch(scheduleTaskRequest(bulletId));
    return bujoy
      .post(`/collection/${collectionId}/bullet/${bulletId}/schedule`, data)
      .then(res => dispatch(scheduleTaskSuccess(bulletId, res.data)))
      .catch(error => dispatch(scheduleTaskFailure(bulletId, error.message)));
  };
}
