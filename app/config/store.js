import { createStore } from 'redux';
import reducers from './../reducers';

export const store = (initialStore) => { return (initialStore ? createStore(reducers, initialStore) : createStore(reducers)) };