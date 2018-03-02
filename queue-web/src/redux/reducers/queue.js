import { ADD_TO_QUEUE, DELETE_FROM_QUEUE, SKIP_FROM_QUEUE, PLAY_NEXT_ON_QUEUE, UP_FROM_QUEUE, DOWN_FROM_QUEUE } from '../actions/queue';
import { createReducer } from './utils';

const playNextOnQueue = (state) =>(state.slice(1));
const addToPlayQueue = (state, value) => ([...state, value.value]);
const skipFromQueue = (state, value) =>(state.slice(value.value));
const deleteFromPlayQueue = (state, value) => (state.filter((el)=>el.title !== value.value.title));
const upFromQueue = (state, value)=>{
    const index = value.value;
    if( index === 0){ return state
    } else {
      const newState = state.slice();
      const temp = newState[index - 1];
      newState[index -1] = newState[index];
      newState[index] = temp;
      return newState;
    }
};
const downFromQueue = (state, value)=>{
  const index = value.value;
  if( index === state.length -1){ return state
  } else {
    const newState = state.slice();
    const temp = newState[index + 1];
    newState[index + 1] = newState[index];
    newState[index] = temp;
    return newState;
  }
}

const handlers = {
  [PLAY_NEXT_ON_QUEUE]: playNextOnQueue,
  [ADD_TO_QUEUE]: addToPlayQueue,
  [SKIP_FROM_QUEUE]: skipFromQueue,
  [DELETE_FROM_QUEUE]: deleteFromPlayQueue,
  [UP_FROM_QUEUE]: upFromQueue,
  [DOWN_FROM_QUEUE]: downFromQueue
};

export default createReducer({}, handlers);
