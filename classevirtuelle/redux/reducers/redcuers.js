import { combineReducers } from "redux";

import {
  authReducer,
  userReducer,
  loadedUserReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./userReducers";

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  loadedUser: loadedUserReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
});

export default reducer;
