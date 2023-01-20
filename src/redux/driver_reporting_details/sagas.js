import { all, takeEvery, put, call } from "redux-saga/effects";
import actions from "./actions";
import * as dataAccess from "../../utils/ajax";
import { REPORT_API } from "../../constants/api-constants";

export const postLambda = async (url, payload) =>
  await dataAccess.postLambda(url, payload);

export function* getDriverReportingDetailsApiSagas(data) {
  const { payload } = data;
  let url = REPORT_API;
  try {
    let response = yield call(postLambda, url, payload);

    if (response) {
      yield put(actions.getDriverReportingDetailsAPISuccess(0, response));
    }
  } catch (error) {
    yield put(actions.getDriverReportingDetailsAPIFailure(1));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_DRIVERREPORTINGDETAILS, getDriverReportingDetailsApiSagas),
  ]);
}
