// import { configureStore } from '@reduxjs/toolkit'

// import clockReducer from './lib/slices/clockSlice'
// import counterReducer from './lib/slices/counterSlice'
// import notesReducer from './lib/slices/notesSlice'

// export default configureStore({
//   reducer: {
//     counter: counterReducer,
//     clock: clockReducer,
//     notes: notesReducer,
//   },
//   devTools: true,
// })


import { applyMiddleware, createStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'

import rootReducer from 'posts/reducers/rootReducer'
import rootSaga from 'posts/sagas/rootSaga'

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]))

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export const wrapper = createWrapper(makeStore, { debug: true })