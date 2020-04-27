import entitiesReducer from './entitiesReducer';
import merge from 'lodash/merge';
import * as types from '../actions/types';
import * as fixtures from '../actions/collection/fixtures';

describe('entitiesReducer', () => {
  it('should return the initial state', () => {
    expect(entitiesReducer(undefined, {})).toEqual({
      collections: {},
      bullets: {}
    });
  });

  it('should handle a FETCH_COLLECTIONS request success', () => {
    const { entities } = fixtures.collectionsResponseNormalized;
    const state = entitiesReducer(
      {},
      {
        type: types.FETCH_COLLECTIONS_SUCCESS,
        entities
      }
    );
    expect(Object.keys(state.collections).length).toEqual(2);
    expect(Object.keys(state.bullets).length).toEqual(2);
    expect(state.collections).toEqual(entities.collections);
    expect(state.bullets).toEqual(entities.bullets);
  });

  it('should handle a FETCH_COLLECTION request success', () => {
    const { entities } = fixtures.collectionResponseNormalized;
    const state = entitiesReducer(
      {},
      {
        type: types.FETCH_COLLECTION_SUCCESS,
        entities
      }
    );
    expect(Object.keys(state.collections).length).toEqual(1);
    expect(Object.keys(state.bullets).length).toEqual(1);
    expect(state.collections).toEqual(entities.collections);
    expect(state.bullets).toEqual(entities.bullets);
  });

  it('should handle a FETCH_BULLET request success', () => {
    const { entities } = fixtures.bulletResponseNormalized;
    const bulletId = Object.keys(entities.bullets)[0];
    const state = entitiesReducer(
      {},
      {
        type: types.FETCH_BULLET_SUCCESS,
        bulletId,
        entities
      }
    );
    expect(Object.keys(state.collections).length).toEqual(0);
    expect(Object.keys(state.bullets).length).toEqual(1);
    expect(state.collections).toEqual({});
    expect(state.bullets).toEqual(entities.bullets);
  });

  it('should handle a UPDATE_BULLET request success', () => {
    const { entities } = fixtures.bulletResponseNormalized;
    const bulletId = Object.keys(entities.bullets)[0];
    const state = entitiesReducer(
      {},
      {
        type: types.UPDATE_BULLET_SUCCESS,
        bulletId,
        entities
      }
    );
    expect(Object.keys(state.collections).length).toEqual(0);
    expect(Object.keys(state.bullets).length).toEqual(1);
    expect(state.collections).toEqual({});
    expect(state.bullets).toEqual(entities.bullets);
  });

  it('should handle a CREATE_BULLET request success', () => {
    const { entities } = fixtures.bulletResponseNormalized;
    const parentId = Object.keys(entities.bullets)[0];
    const state = entitiesReducer(
      {},
      {
        type: types.CREATE_BULLET_SUCCESS,
        parentId,
        entities
      }
    );
    expect(Object.keys(state.collections).length).toEqual(0);
    expect(Object.keys(state.bullets).length).toEqual(1);
    expect(state.collections).toEqual({});
    expect(state.bullets).toEqual(entities.bullets);
  });

  it('should handle a DELETE_BULLET request success', () => {
    const { entities } = fixtures.collectionResponseEmptyNormalized;
    const bulletId = Object.keys(entities.bullets)[0];
    const state = entitiesReducer(
      {},
      {
        type: types.DELETE_BULLET_SUCCESS,
        bulletId,
        entities
      }
    );
    expect(Object.keys(state.collections).length).toEqual(1);
    expect(Object.keys(state.bullets).length).toEqual(0);
    expect(state.collections).toEqual(entities.collections);
    expect(state.bullets).toEqual({});
  });

  it('should handle a COMPLETE_TASK request success', () => {
    const { entities } = merge(
      fixtures.collectionResponseNormalized,
      fixtures.taskCompletedResponseNormalized
    );
    const bulletId = Object.keys(entities.bullets)[0];
    const state = entitiesReducer(
      {},
      {
        type: types.COMPLETE_TASK_SUCCESS,
        bulletId,
        entities
      }
    );
    expect(Object.keys(state.collections).length).toEqual(1);
    expect(Object.keys(state.bullets).length).toEqual(1);
    expect(state.collections).toEqual(entities.collections);
    expect(state.bullets).toEqual(entities.bullets);
  });

  it('should handle a DISCARD_TASK request success', () => {
    const { entities } = merge(
      fixtures.collectionResponseNormalized,
      fixtures.taskDiscardedResponseNormalized
    );
    const bulletId = Object.keys(entities.bullets)[0];
    const state = entitiesReducer(
      {},
      {
        type: types.DISCARD_TASK_SUCCESS,
        bulletId,
        entities
      }
    );
    expect(Object.keys(state.collections).length).toEqual(1);
    expect(Object.keys(state.bullets).length).toEqual(1);
    expect(state.collections).toEqual(entities.collections);
    expect(state.bullets).toEqual(entities.bullets);
  });

  it('should handle a RESET_TASK request success', () => {
    const { entities } = fixtures.collectionResponseNormalized;
    const bulletId = Object.keys(entities.bullets)[0];
    const state = entitiesReducer(
      {},
      {
        type: types.RESET_TASK_SUCCESS,
        bulletId,
        entities
      }
    );
    expect(Object.keys(state.collections).length).toEqual(1);
    expect(Object.keys(state.bullets).length).toEqual(1);
    expect(state.collections).toEqual(entities.collections);
    expect(state.bullets).toEqual(entities.bullets);
  });

  it('should handle a MIGRATE_TASK request success', () => {
    const { entities } = merge(
      fixtures.collectionResponseNormalized,
      fixtures.taskMigratedResponseNormalized
    );
    const bulletId = Object.keys(entities.bullets)[0];
    const state = entitiesReducer(
      {},
      {
        type: types.MIGRATE_TASK_SUCCESS,
        bulletId,
        entities
      }
    );
    expect(Object.keys(state.collections).length).toEqual(1);
    expect(Object.keys(state.bullets).length).toEqual(1);
    expect(state.collections).toEqual(entities.collections);
    expect(state.bullets).toEqual(entities.bullets);
  });

  it('should handle a SCHEDULE_TASK request success', () => {
    const { entities } = merge(
      fixtures.collectionResponseNormalized,
      fixtures.taskScheduledResponseNormalized
    );
    const bulletId = Object.keys(entities.bullets)[0];
    const state = entitiesReducer(
      {},
      {
        type: types.SCHEDULE_TASK_SUCCESS,
        bulletId,
        entities
      }
    );
    expect(Object.keys(state.collections).length).toEqual(1);
    expect(Object.keys(state.bullets).length).toEqual(1);
    expect(state.collections).toEqual(entities.collections);
    expect(state.bullets).toEqual(entities.bullets);
  });
});
