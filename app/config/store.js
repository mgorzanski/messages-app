import { applyMiddleware, createStore } from 'redux';
import reducers from './../reducers';
import logger from 'redux-logger';

const middleware = applyMiddleware(logger);

export const store = createStore(reducers, middleware);