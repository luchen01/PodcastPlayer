import {LOAD_PODCAST_EPISODE, FINISH_EPISODE_PLAYBACK, loadPodcastEpisode} from '../actions/player';

import {playNextOnQueue} from '../actions/queue';

export default (store) => (next) => (action) => {
  console.log('middleware', action, store.getState(), store.dispatch);
  const state = store.getState();

  if(action.type === "FINISH_EPISODE_PLAYBACK"){
      console.log("state", state);
      if(state.queue.length > 0){
        store.dispatch(loadPodcastEpisode(state.queue[0]))
      }
  }

  if(action.type === "LOAD_PODCAST_EPISODE" && action.payload.title === state.queue[0].title){
    console.log("dispatch load podcast episode");
    store.dispatch(playNextOnQueue());
  }


  next(action);
}
