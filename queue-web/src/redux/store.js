import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createReducers from './reducers';
import playerMiddleware from './middleware/player';

export default function configureStore({ initialState = {} }) {
  return createStore(createReducers, initialState, composeWithDevTools(
    applyMiddleware(playerMiddleware)
  ));
}
