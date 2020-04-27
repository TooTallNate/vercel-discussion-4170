import { normalize } from 'normalizr';
import * as types from '../types';
import { bujoy } from '../../api';
import { bullet } from '../schemas';

function migrateTaskRequest(bulletId) {
  return {
    type: types.MIGRATE_TASK_REQUEST,
    bulletId
  };
}

function migrateTaskSuccess(bulletId, data) {
  const { entities } = normalizeData(data);

  return {
    type: types.MIGRATE_TASK_SUCCESS,
    bulletId,
    entities
  };
}

function migrateTaskFailure(bulletId, error) {
  return {
    type: types.MIGRATE_TASK_FAILURE,
    bulletId,
    error
  };
}

function normalizeData(data) {
  return normalize(data, bullet);
}

export default function migrateTask(collectionId, bulletId, data) {
  return dispatch => {
    dispatch(migrateTaskRequest(bulletId));
    return bujoy
      .post(`/collection/${collectionId}/bullet/${bulletId}/migrate`, data)
      .then(res => dispatch(migrateTaskSuccess(bulletId, res.data)))
      .catch(error => dispatch(migrateTaskFailure(bulletId, error.message)));
  };
}
