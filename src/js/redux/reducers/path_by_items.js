import { CHANGE_PATH } from '../actionTypes'
import { path_chunk } from '../rd_store_sections'


export const initial_state = {
  [path_chunk.POKEMON]: globalThis.localStorage?.getItem('path__pokemon') || 1
}

export function path_by_items(state = initial_state, action) {
  switch (action.type) {
    case CHANGE_PATH:
      let new_path = {...state}
      if (action.path.pokemon) {
        new_path[path_chunk.POKEMON] = action.path.pokemon
        globalThis.localStorage?.setItem('path__pokemon', action.path.pokemon);
      }

      return {...new_path}
    default:
      return state
  }
}
