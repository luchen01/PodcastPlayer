import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createReducers from './reducers';

export default function configureStore({ initialState = {} }) {
  const functions = [
    composeWithDevTools(
      applyMiddleware(
        thunk,
      ),
    ),
  ];

  const enhancers = compose(...functions);

  return createStore(createReducers, initialState, enhancers);
}
