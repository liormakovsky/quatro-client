import { combineReducers } from "redux";
import userReducer from "./users/userReducer";

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
