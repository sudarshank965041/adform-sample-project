import { call, put, takeEvery } from "redux-saga/effects";
import getUsers from "../service/getUsers";
import messagePopup from "../service/message-popup";

// Action Type
export const actionType = {
  GET_USERS_START: "GET_USERS_START",
  GET_USERS_SUCCESS: "GET_USERS_SUCCESS",
  GET_USERS_FAILED: "GET_USERS_FAILED",
};

// Actions

export const getUsersListStart = () => ({
  type: actionType.GET_USERS_START,
});

export const usersListSuccess = (data) => ({
  type: actionType.GET_USERS_SUCCESS,
  payload: data,
});

export const usersListFailed = (data) => ({
  type: actionType.GET_USERS_FAILED,
  payload: data,
});

// Reducer
const INIT_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default function usersListReducer(
  state = INIT_STATE,
  action = { type: "", payload: {} }
) {
  switch (action.type) {
    case actionType.GET_USERS_START:
      return { ...state, loading: true };
    case actionType.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case actionType.GET_USERS_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return { ...state };
  }
}

// side effect
export function* getUsersListSaga() {
  try {
    const response = yield call(getUsers);
    if (response && response.length) {
      yield put(usersListSuccess(response));
    } else {
      messagePopup("", "Users List failed", "error");
      yield put(usersListFailed("Users List failed"));
    }
  } catch (error) {
    messagePopup("", "Users List Failed", "error");
    yield put(usersListFailed("Users List Failed"));
  }
}

export function* watchaUsersListSaga() {
  yield takeEvery(actionType.GET_USERS_START, getUsersListSaga);
}
