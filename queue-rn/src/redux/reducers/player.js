import { LOAD_PODCAST_EPISODE, FINISH_EPISODE_PLAYBACK } from '../actions/player';
import { createReducer } from './utils';

const loadEpisode = (state, { payload }) => ({ ...state, ...payload });
const finishEpisodePlayback = (state) => state;

const handlers = {
  [LOAD_PODCAST_EPISODE]: loadEpisode,
  [FINISH_EPISODE_PLAYBACK]: finishEpisodePlayback,
};

export default createReducer({}, handlers);
