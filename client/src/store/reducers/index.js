import { combineReducers } from 'redux';
import {signup, requestUser} from './userReducers';
import {requestPosts} from './postReducers';

export default combineReducers({
signup,
requestUser,
requestPosts  
});