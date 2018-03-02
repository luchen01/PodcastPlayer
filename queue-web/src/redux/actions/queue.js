export const ADD_TO_QUEUE = 'ADD_TO_QUEUE';
export const SKIP_FROM_QUEUE = 'SKIP_FROM_QUEUE';
export const DELETE_FROM_QUEUE = 'DELETE_FROM_QUEUE';
export const PLAY_NEXT_ON_QUEUE = 'PLAY_NEXT_ON_QUEUE';
export const UP_FROM_QUEUE = 'UP_FROM_QUEUE';
export const DOWN_FROM_QUEUE = 'DOWN_FROM_QUEUE';

export function addToQueue(podcast) {
  return {
    type: ADD_TO_QUEUE,
    value: podcast,
  };
}

export function deleteFromQueue(podcast){
  return {
    type: DELETE_FROM_QUEUE,
    value: podcast,
  }
}

export function skipFromQueue(index){
  return {
    type: SKIP_FROM_QUEUE,
    value: index
  }
}

export function playNextOnQueue(){
  return {
    type: PLAY_NEXT_ON_QUEUE
  }
}

export function upFromQueue(podcast){
  return {
    type: UP_FROM_QUEUE,
    value: podcast,
  }
}

export function downFromQueue(podcast){
  return {
    type: DOWN_FROM_QUEUE,
    value: podcast,
  }
}
