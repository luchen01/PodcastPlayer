import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createReducers from './reducers';

export default function configureStore({ initialState = {} }) {
  return createStore(createReducers, initialState, composeWithDevTools(
    applyMiddleware(/* middleware */)
  ));
}
