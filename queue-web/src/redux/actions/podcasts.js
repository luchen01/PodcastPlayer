import { fetchFeeds } from './utils';

export const ADD_PODCASTS = 'ADD_PODCASTS';

export function addPodcasts(podcasts) {
  return {
    type: ADD_PODCASTS,
    payload: podcasts,
  };
}

export function getPodcasts(dispatch) {
  fetchFeeds()
    .then((podcasts) => dispatch(addPodcasts(podcasts)))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
    });
}
