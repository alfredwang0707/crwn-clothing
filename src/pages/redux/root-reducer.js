 import { combineReducers } from 'redux'

 import userReducer from './user/user.reducer'

 export default combineReducers({
     user: userReducer
     //turns it into one giant object
 })