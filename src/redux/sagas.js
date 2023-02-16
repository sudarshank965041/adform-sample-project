import { all } from "redux-saga/effects";
import { watchaUsersListSaga } from "./users";
export default function* rootSaga() {
  yield all([watchaUsersListSaga()]);
}
