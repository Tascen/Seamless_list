import store from '../store.js'
import * as name from "../rd_store_sections";
import { fetch_items } from './all'
import { get_last_pokemon_id } from '../geters/pokemon_geters.js'





export function load_pokemons(new_par = {}) {
  let par = {
    limit: 20,
    offset: get_last_pokemon_id(store.getState()) || 0
  }
  par = {...par, ...new_par}

  return multe_fetch('https://pokeapi.co/api/v2/pokemon', par.limit, par.offset, name.items_type.POKEMONS)
}

export function load_pokemon(id = 1) {
  return fetch_items(name.items_type.POKEMONS, `https://pokeapi.co/api/v2/pokemon/${id}`, {save_old: true})(store.dispatch)
}

export let pokemon_charact_loaders = {
  load_egg_groups: async (new_par = {}) => {
    let max_count = await fetch('https://pokeapi.co/api/v2/egg-group/?limit=1').then(response => response.json()).then(json => json.count)
    let par = {
      limit: max_count,
      offset: get_last_pokemon_id(store.getState()) || 0
    }
    par = {...par, ...new_par}

    return multe_fetch('https://pokeapi.co/api/v2/egg-group', par.limit, par.offset, name.items_type.EGG_GROUPS)
  },

  load_habitats: async (new_par = {}) => {
    let max_count = await fetch('https://pokeapi.co/api/v2/pokemon-habitat/?limit=1').then(response => response.json()).then(json => json.count)
    let par = {
      limit: max_count,
      offset: get_last_pokemon_id(store.getState()) || 0
    }
    par = {...par, ...new_par}

    return multe_fetch('https://pokeapi.co/api/v2/pokemon-habitat', par.limit, par.offset, name.items_type.HABITATS)
  },

  load_genders: async (new_par = {}) => {
    let max_count = await fetch('https://pokeapi.co/api/v2/gender/?limit=1').then(response => response.json()).then(json => json.count)
    let par = {
      limit: max_count,
      offset: get_last_pokemon_id(store.getState()) || 0
    }
    par = {...par, ...new_par}

    return multe_fetch('https://pokeapi.co/api/v2/gender', par.limit, par.offset, name.items_type.GENDERS)
  },

  load_growth_rates: async (new_par = {}) => {
    let max_count = await fetch('https://pokeapi.co/api/v2/growth-rate/?limit=1').then(response => response.json()).then(json => json.count)
    let par = {
      limit: max_count,
      offset: get_last_pokemon_id(store.getState()) || 0
    }
    par = {...par, ...new_par}

    return multe_fetch('https://pokeapi.co/api/v2/growth-rate', par.limit, par.offset, name.items_type.GROWTH_RATES)
  }
}




function multe_fetch(url, limit, offset, where_save) {
  let first_fetch = new Promise(resolve=>{resolve()});
  for (let i = 1; i <= limit; i++) {
    if (i >= limit) {
      return first_fetch.then(()=>{
        return fetch_items(where_save, `${url}/${i + offset}/`, {save_old: true})(store.dispatch)
      })
    } else {
      first_fetch = first_fetch.then(()=>{
        return fetch_items(where_save, `${url}/${i + offset}/`, {save_old: true})(store.dispatch)
      })
    }
  }
}
