import { ADD_TO_QUEUE, DELETE_FROM_QUEUE, PLAY_NEXT_ON_QUEUE, UP_FROM_QUEUE, DOWN_FROM_QUEUE } from '../actions/queue';
import { createReducer } from './utils';

const playNextOnQueue = (state) =>(state.slice(1));
const addToPlayQueue = (state, value) => ([...state, value.value]);
const deleteFromPlayQueue = (state, value) => (state.filter((el)=>el.title !== value.value.title));
const upFromQueue = (state, value)=>{
    state
};
const downFromQueue = (state, value)=>{
  state
}

const handlers = {
  [PLAY_NEXT_ON_QUEUE]: playNextOnQueue,
  [ADD_TO_QUEUE]: addToPlayQueue,
  [DELETE_FROM_QUEUE]: deleteFromPlayQueue,
  [UP_FROM_QUEUE]: upFromQueue,
  [DOWN_FROM_QUEUE]: downFromQueue
};

export default createReducer({}, handlers);

//
//
// import { ADD_PODCASTS } from '../actions/podcasts';
// import { createReducer } from './utils';
//
// const addPodcasts = (state, { payload }) =>
//   payload.reduce((result, podcast) => ({ ...result, [podcast.slug]: podcast }), state);
//
// const handlers = {
//   [ADD_PODCASTS]: addPodcasts,
// };
//
// export default createReducer({}, handlers);
