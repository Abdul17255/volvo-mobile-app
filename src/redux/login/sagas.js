import { all, takeEvery, put, call } from "redux-saga/effects";
import actions from "./actions";
import * as dataAccess from "../../utils/ajax";
import { VOLVO_API } from "../../constants/api-constants";

export const postLambda = async (url, payload) =>
  await dataAccess.postLambda(url, payload);

export function* getLoginApiSagas(data) {
  const { payload } = data;
  let url = VOLVO_API;
  try {
    let response = yield call(postLambda, url, payload);
    if (response) {
      yield put(actions.getLoginAPISuccess(0, response));
    }
  } catch (error) {
    yield put(actions.getLoginApiFailure(1));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.GET_LOGIN, getLoginApiSagas)]);
}
