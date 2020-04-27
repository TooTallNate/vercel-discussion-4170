import { combineReducers } from 'redux';
import communicationReducer from './communicationReducer';
import entitiesReducer from './entitiesReducer';
import journalReducer from './journalReducer';

export default combineReducers({
  communication: communicationReducer,
  entities: entitiesReducer,
  journal: journalReducer
});
