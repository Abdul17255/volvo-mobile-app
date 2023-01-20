import { all, takeEvery, put, call } from "redux-saga/effects";
import actions from "./actions";
import * as dataAccess from "../../utils/ajax";
import { TRIP_MASTER_UPDATE_API } from "../../constants/api-constants";

export const postLambda = async (url, payload) =>
  await dataAccess.postLambda(url, payload);

export function* getTripMasterUpdateApiSagas(data) {
  const { payload } = data;
  let url = TRIP_MASTER_UPDATE_API;
  try {
    let response = yield call(postLambda, url, payload);

    if (response) {
      yield put(actions.getTripMasterUpdateAPISuccess(0, response));
    }
  } catch (error) {
    yield put(actions.getTripMasterUpdateAPIFailure(1));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_TRIPMASTERUPDATE, getTripMasterUpdateApiSagas),
  ]);
}
