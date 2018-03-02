import { combineReducers } from 'redux';
import podcasts from './podcasts';
import player from './player';
import queue from './queue';

export default combineReducers({ podcasts, player, queue });
