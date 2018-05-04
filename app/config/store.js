import { applyMiddleware, createStore } from 'redux';
import reducers from './../reducers';
import logger from 'redux-logger';

const middleware = applyMiddleware(logger);

export const store = (initialStore) => { return (initialStore ? createStore(reducers, initialStore, middleware) : createStore(reducers, middleware)) };