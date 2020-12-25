const assert = require('assert');

import configureStore from 'redux-mock-store'

import store, {initial_state} from '../redux/store'
import {path_by_items} from '../redux/reducers/path_by_items.js'
import {items_by_type} from '../redux/reducers/items_by_type.js'

import * as store_sections_names from "../redux/rd_store_sections";
import * as actions_type_name from '../redux/actionTypes'

import nullObjs from './nullObj.js'
import * as actions from "../redux/actions/all.js";
import * as loaders from "../redux/actions/loaders.js";
import * as pokemon_charact_geters from "../redux/geters/pokemon_charact_geters.js";
import * as pokemon_geters from "../redux/geters/pokemon_geters.js";

describe('>>> S T O R E <<<', ()=>{
  const mockStore = configureStore();
  var store = mockStore(initial_state);

  describe('Reducers', ()=>{

    describe('--- items_by_type ---', ()=>{

      it('Request sumthing items', () => {
        let state = {
          [store_sections_names.items_type.POKEMONS]: {
            is_fetching: true,
            items: []
          }
        }
        state = items_by_type(state,
          {
            type: actions_type_name.REQUEST_ITEMS,
            items_type: store_sections_names.items_type.POKEMONS
          }
        )

        assert.deepStrictEqual(
          state,
          {
            [store_sections_names.items_type.POKEMONS]: {
              is_fetching: true,
              items: []
            }
          },
        );
      });

      it(`Receive sumthing items and save old`, () => {
        let state = items_by_type(
          {
            [store_sections_names.items_type.POKEMONS]: {
              is_fetching: false,
              items: [
                {id: 1}
              ]
            }
          },
          {
            type: actions_type_name.RECEIVE_ITEMS,
            items_type: store_sections_names.items_type.POKEMONS,
            items: [
              {id: 1},
              {id: 2}
            ],
            save_old: true
          }
        )

        assert.deepStrictEqual(
          state,
          {
            [store_sections_names.items_type.POKEMONS]: {
              items: [
                {id: 1},
                {id: 1},
                {id: 2}
              ],
              is_fetching: false,
            }
          },
        );
      });

      it(`Receive sumthing items and save\`not old`, () => {
        let state = items_by_type(
          {
            [store_sections_names.items_type.POKEMONS]: {
              is_fetching: false,
              items: [
                {id: 3}
              ]
            }
          },
          {
            type: actions_type_name.RECEIVE_ITEMS,
            items_type: store_sections_names.items_type.POKEMONS,
            items: [
              {id: 1},
              {id: 2}
            ],
            save_old: false
          }
        )

        assert.deepStrictEqual(
          state,
          {
            [store_sections_names.items_type.POKEMONS]: {
              items: [
                {id: 1},
                {id: 2}
              ],
              is_fetching: false,
            }
          },
        );
      });

    });

    describe('--- path_by_items ---', ()=>{
      it(`Change active pekemon id to 56`, () => {
          let state = {[store_sections_names.path_chunk.POKEMON]: 16}
          state = path_by_items(state, {type: actions_type_name.CHANGE_PATH, path: {pokemon: 56}})
          assert.deepEqual(state, {[store_sections_names.path_chunk.POKEMON]: 56});
      });
    });

  });

  describe('Geters', ()=>{

    describe('when nothing return', ()=>{

      describe("--- pokemon_charact_geters ---", ()=>{
        it(`get_egg_groups() equal empty array`, () => {
          assert.deepEqual(pokemon_charact_geters.get_egg_groups(), []);
        });

        it(`get_habitats() equal empty array`, () => {
          assert.deepEqual(pokemon_charact_geters.get_habitats(), []);
        });
        it(`get_genders() equal empty array`, () => {
          assert.deepEqual(pokemon_charact_geters.get_genders(), []);
        });
        it(`get_growth_rates() equal empty array`, () => {
          assert.deepEqual(pokemon_charact_geters.get_growth_rates(), []);
        });
      })

      describe("--- pokemon_geters ---", ()=>{
        it(`get_last_pokemon_id() equal -1`, () => {
          assert.equal(pokemon_geters.get_last_pokemon_id(), -1);
        });
        it(`get_pokemons() equal empty array`, () => {
          assert.deepEqual(pokemon_geters.get_pokemons(), []);
        });
        it(`get_active_pokemon() equal NuLLOBJ`, () => {
          assert.deepEqual(pokemon_geters.get_active_pokemon(), nullObjs.pokemon);
        });
      })

    })

  });

});
