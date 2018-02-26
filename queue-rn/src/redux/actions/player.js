export const LOAD_PODCAST_EPISODE = 'LOAD_PODCAST_EPISODE';
export const FINISH_EPISODE_PLAYBACK = 'FINISH_EPISODE_PLAYBACK';

export function loadPodcastEpisode(episode) {
  return {
    type: LOAD_PODCAST_EPISODE,
    payload: episode,
  };
}

export function finishEpisodePlayback() {
  return {
    type: FINISH_EPISODE_PLAYBACK,
  };
}
