import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import sagas from "./sagas";
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// export function configureStore(initialState) {
export const store = createStore(
  reducers,
  {},
  applyMiddleware(...middlewares)
);
sagaMiddleware.run(sagas);
//   return store;
// }
