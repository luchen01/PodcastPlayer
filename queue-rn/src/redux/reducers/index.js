import { combineReducers } from 'redux';
import podcasts from './podcasts';
import player from './player';

export default combineReducers({ podcasts, player });
