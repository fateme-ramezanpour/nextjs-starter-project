import { all } from "redux-saga/effects";
import clockSagas from "./clockSaga";

export default function* rootSaga() {
  yield all([
    clockSagas(),
  ]);
}
