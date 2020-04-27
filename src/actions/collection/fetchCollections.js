import { normalize } from 'normalizr';
import merge from 'lodash/merge';
import * as types from '../types';
import { bujoy } from '../../api';
import { collection } from '../schemas';

function fetchCollectionsRequest() {
  return {
    type: types.FETCH_COLLECTIONS_REQUEST
  };
}

function fetchCollectionsSuccess(data) {
  const normalizedData = normalizeData(data);
  const { daily_log, monthly_log, future_log } = normalizedData;
  const entities = mergeEntities(normalizedData);

  return {
    type: types.FETCH_COLLECTIONS_SUCCESS,
    journal: {
      daily_log: daily_log.result || '',
      monthly_log: {
        anytime: monthly_log.anytime.result || '',
        days: monthly_log.days.result || {}
      },
      future_log: {
        anytime: future_log.anytime.result || '',
        days: future_log.days.result || [],
        months: future_log.months.result || []
      }
    },
    entities
  };
}

function fetchCollectionsFailure(error) {
  return {
    type: types.FETCH_COLLECTIONS_FAILURE,
    error
  };
}

function normalizeData(data) {
  return {
    ...data,
    daily_log: normalize(data.daily_log, collection),
    monthly_log: {
      ...data.monthly_log,
      anytime: normalize(data.monthly_log.anytime, collection),
      days: normalize(data.monthly_log.days, [collection])
    },
    future_log: {
      ...data.future_log,
      anytime: normalize(data.future_log.anytime, collection),
      days: normalize(data.future_log.days, [collection]),
      months: normalize(data.future_log.months, [collection])
    }
  };
}

function mergeEntities(normalizedData) {
  const { daily_log, monthly_log, future_log } = normalizedData;

  var entities = [
    daily_log.entities,
    monthly_log.anytime.entities,
    monthly_log.days.entities,
    future_log.anytime.entities,
    future_log.days.entities,
    future_log.months.entities
  ]
    .filter(
      entities =>
        entities.collections && Object.keys(entities.collections).length > 0
    )
    .filter(
      collection => !Object.keys(collection.collections).includes('undefined')
    );

  return merge(...entities);
}

export default function fetchCollections() {
  return dispatch => {
    dispatch(fetchCollectionsRequest());
    return bujoy
      .get('/collection')
      .then(res => dispatch(fetchCollectionsSuccess(res.data)))
      .catch(error => dispatch(fetchCollectionsFailure(error.message)));
  };
}
