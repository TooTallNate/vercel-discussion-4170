import { combineReducers } from 'redux';
import fetchCollectionsReducer from './fetchCollectionsReducer';
import fetchCollectionReducer from './fetchCollectionReducer';

export default combineReducers({
  fetchCollections: fetchCollectionsReducer,
  fetchCollection: fetchCollectionReducer
});
