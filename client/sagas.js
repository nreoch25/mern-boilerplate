import { all, call, put, takeEvery } from "redux-saga/effects";
import callApi from "./utils/apiCaller";

import { FETCH_GISTS_REQUESTED, FETCH_GISTS_SUCCEEDED } from "./actions";

export function* fetchGists() {
  const data = yield call(callApi, "https://api.github.com/gists", "get");
  yield put({
    type: FETCH_GISTS_SUCCEEDED,
    gists: data.map(gist => ({
      id: gist.id,
      title: gist.description || "No Title"
    }))
  });
}

export function* fetchGistsSaga() {
  yield takeEvery(FETCH_GISTS_REQUESTED, fetchGists);
}

export default function* rootSaga() {
  yield all([fetchGistsSaga()]);
}
