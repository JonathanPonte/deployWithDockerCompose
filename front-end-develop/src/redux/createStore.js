import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";

export default (reducer, middleware) => {
    const enhancer = composeWithDevTools(applyMiddleware(...middleware));

    return createStore(reducer, enhancer);
}