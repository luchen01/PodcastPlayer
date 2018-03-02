import {LOAD_PODCAST_EPISODE, FINISH_EPISODE_PLAYBACK, loadPodcastEpisode} from '../actions/player';

export default (store) => (next) => (action) => {
  console.log('middleware', action, store.getState(), store.dispatch);

  if(action.type === "FINISH_EPISODE_PLAYBACK"){
      const state = store.getState();
      if(state.queue.length > 0){
        store.dispatch(loadPodcastEpisode(state.queue[0]));
      }
  }
  next(action);
}
