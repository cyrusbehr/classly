import { combineReducers } from 'redux';
import classReducer from './classReducer';
import userReducer from './userReducer'
import socketReducer from './socketReducer'

const rootReducer = combineReducers({
  classReducer,
  userReducer,
  socketReducer,
});

export default rootReducer;
