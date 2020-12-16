import { all, call, delay, put, take, takeLatest, takeEvery, fork } from 'redux-saga/effects'
import { actionTypes, failure, loadDataSuccess, tickClock } from 'posts/actions/actions'

function* runClockSaga() {
  // yield take(actionTypes.START_CLOCK)
  while (true) {
    yield put(tickClock(false))
    yield delay(1000)
  }
}

function* loadDataSaga() {
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/users')
    const data = yield res.json()
    yield put(loadDataSuccess(data))
  } catch (err) {
    yield put(failure(err))
  }
}


function* watchloadDataSaga() {
  yield takeEvery(actionTypes.LOAD_DATA, loadDataSaga);
}

function* watchrunClockSaga() {
  yield takeEvery(actionTypes.START_CLOCK, runClockSaga);
}
// function* rootSaga() {
//   yield all([
//     call(runClockSaga),
//     takeLatest(actionTypes.LOAD_DATA, loadDataSaga),
//   ])
// }
export default function* clockSagas() {
  yield fork(watchloadDataSaga);
  yield fork(watchrunClockSaga);
}
