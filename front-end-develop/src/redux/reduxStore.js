import createStore from './createStore';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

import createSagaMilddleware from 'redux-saga';

import { persistStore } from 'redux-persist';
import persistReducers from './persistReducers';

const sagaMiddleware = createSagaMilddleware();
const middlewares = [ sagaMiddleware ]

const store = createStore(persistReducers(rootReducer),middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };