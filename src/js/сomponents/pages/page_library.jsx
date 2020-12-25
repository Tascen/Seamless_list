import React, { useState, useEffect } from 'react';
let throttle = require('lodash.throttle');

import {Input_search} from '../inputs/input_search.jsx'
import {Input_list} from '../inputs/input_list.jsx'
import {Button} from '../inputs/button.jsx'

import {Item_poster} from '../list_items/item_poster.jsx'
import { Icon_book } from "../svg";
import { CSSTransition, TransitionGroup } from 'react-transition-group';


import * as path from "../../routers_path";


import { connect } from "react-redux";

import {get_egg_groups, get_habitats, get_genders, get_growth_rates} from '../../redux/geters/pokemon_charact_geters.js'
import {get_pokemons} from '../../redux/geters/pokemon_geters.js'

import {pokemon_charact_loaders} from '../../redux/actions/loaders.js'
import {load_pokemons} from '../../redux/actions/loaders.js'

import {change_path} from '../../redux/actions/all.js'

//----------------------------------------



let pokemons_list_is_fetching = false
let min_pokemons_count = 10
export class Page_library extends React.Component {
  constructor(props) {
    super(props);
    this.page = React.createRef();

    this.state = {
      offset: 0,
      filters: {
        search_value: '',
        egg_group: 0,
        habitat: 0,
        gender: 0,
        growth_rate: 0,
      },
    };

    this.throttle_onScroll = throttle(update_offset_when_scrolledDown.bind(this), 100)
  }

  componentDidMount() {
    this.props.growth_rates.length <= 1 && pokemon_charact_loaders.load_growth_rates()
    this.props.habitats.length <= 1 && pokemon_charact_loaders.load_habitats()
    this.props.egg_groups.length <= 1 && pokemon_charact_loaders.load_egg_groups()

    this.page.current.addEventListener('scroll', this.throttle_onScroll, true )
  }

  componentWillUnmount() {
    this.page.current.removeEventListener('scroll', this.throttle_onScroll, true )
  }



  render() {
    let filters = this.state.filters
    let props = this.props

    let filtered_pokemons = props.pokemons.filter(pokemon=> {
      let by_search_value = filters.search_value == '' || (pokemon.name).toUpperCase().indexOf(filters.search_value) > -1


      let by_habitat = pokemon_fits_by_filter(filters.habitat, props.habitats, pokemon.name)
      let by_gender = true
      let by_growth_rate = pokemon_fits_by_filter(filters.growth_rate, props.growth_rates, pokemon.name)
      let by_egg_group = pokemon_fits_by_filter(filters.egg_group, props.egg_groups, pokemon.name)


      return by_search_value && by_habitat && by_gender && by_growth_rate && by_egg_group
    }) || [];

    if (filtered_pokemons.length < min_pokemons_count || this.state.offset > filtered_pokemons.length) {
      !pokemons_list_is_fetching && load_pokemons({limit: min_pokemons_count}).then(()=>{pokemons_list_is_fetching = false})
      pokemons_list_is_fetching = true
    }

    return (
      <main id="page_library" ref={this.page}>
        <div className="title">
          <Icon_book/>
          <h3>Pokemons library</h3>
        </div>
        <div className="filter">
          <Input_search
            onChange={(event, value) => { this.setState({filters: {...this.state.filters, search_value: value.toUpperCase()}}) }}
            placeholder="Name, difficulty, room, etc..."
          />
          <Input_list
            items={props.genders}
            selected_item={0}
            title={'genders'}
            loced={true}
            onChange={value => { this.setState({filters: {...this.state.filters, gender: value}}) }}
          />
          <Input_list
            items={props.growth_rates}
            selected_item={0}
            title={'growth rates'}
            onChange={value => { this.setState({filters: {...this.state.filters, growth_rate: value}}) }}
          />
          <Input_list
            items={props.habitats}
            selected_item={0}
            title={'habitats'}
            onChange={value => { this.setState({filters: {...this.state.filters, habitat: value}}) }}
          />
          <Input_list
            items={props.egg_groups}
            selected_item={0}
            title={'egg`s groups'}
            onChange={value => { this.setState({filters: {...this.state.filters, egg_group: value}}) }}
          />
        </div>

        <TransitionGroup className="items">
          {filtered_pokemons.length != 0 && filtered_pokemons.map((pokemon, i) =>
            <CSSTransition key={pokemon.id} timeout={500} classNames="item_anim">
              <Item_poster
                key={pokemon.id}
                link_to={path.URl_PAGE_LIBRARY_ITEM}
                cover_src={pokemon.sprites.other['official-artwork'].front_default}
                id={i + 1}
                xp={pokemon.base_experience}
                order={pokemon.order}
                title={pokemon.name}
                onClick={change_path.bind(null, {pokemon: pokemon.id})}
              />
            </CSSTransition>
          )}
        </TransitionGroup>
        {filtered_pokemons.length == 0 && <h3 style={{textAlign: "center"}}>Nothing</h3>}
      </main>
    );
  }
}

const return_data = state => {
  let pokemons = get_pokemons(state)
  let egg_groups = [{title: 'all', id: 0}, ...get_egg_groups(state)]
  let habitats = [{title: 'all', id: 0}, ...get_habitats(state)]
  let genders = [{title: 'all', id: 0}, ...get_genders(state)]
  let growth_rates = [{title: 'all', id: 0}, ...get_growth_rates(state)]

  return { pokemons, egg_groups, habitats, genders, growth_rates };
};
export default connect(return_data)(Page_library);





function update_offset_when_scrolledDown(event) {
  if (this.page.current.isEqualNode(event.target) ) {
    let last_item_offset = 0, container = this.page.current

    let view_port_height = parseFloat(window.getComputedStyle(container, null).getPropertyValue("height"))

    let last_item_postiton = container.children[2].children[container.children[2].children.length - 1 - last_item_offset].getBoundingClientRect().y

    if (last_item_postiton <= view_port_height) {
      !pokemons_list_is_fetching && this.setState({offset: this.state.offset + min_pokemons_count})
    }
  }

}

function pokemon_fits_by_filter(active_filter_id, filter_items, pokemon_name) {
  let bool = false
  if (active_filter_id != 0) {
    filter_items.forEach(filter => {
      if (filter.id == active_filter_id) bool = filter.species.includes(name)
    });
  } else {
    bool = true
  }
  return bool
}
