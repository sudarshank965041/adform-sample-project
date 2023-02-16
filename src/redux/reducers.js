import { combineReducers } from "redux";
import campaignReducer from "./campaigns";
import usersListReducer from "./users";

export default combineReducers({
  campaign: campaignReducer,
  users: usersListReducer
});
