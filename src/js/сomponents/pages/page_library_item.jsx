let React = require('react');

import {Header} from '../page_elements/header.jsx'
import {Slider} from '../page_elements/slider.jsx'
import { Icon_ruler, Icon_order } from '../svg.jsx'

import { connect } from "react-redux";
import {get_active_pokemon, get_active_pokemon_id} from '../../redux/geters/pokemon_geters.js'
import {load_pokemon} from '../../redux/actions/loaders.js'




export class Page_library_item extends React.Component {
  constructor(props) {
    super(props);
    this.page = React.createRef();
    this.state = {
      pokemon_loading: false
    };
  }

  componentDidMount() {
    if (!this.state.pokemon_loading && this.props.pokemon.nullOBJ) {
      load_pokemon(this.props.pokemon_id).then(()=>{this.setState({pokemon_loading: false})})
      this.setState({pokemon_loading: true})
    }
  }

  render() {


    return (
      <main id="page_library_item">

        <Header title={<React.Fragment><h6>Pokemon №{this.props.pokemon.id}</h6><h2>{this.props.pokemon.name}</h2></React.Fragment>} back_button/>

        <div className="page_background"></div>

        <Slider items={this.props.pokemon.sprites}/>

        <ul className="list-grid">

          <li className="list-grid_item">
            <Icon_order/>
            <p className="small">Order</p>
            <p className="small">{this.props.pokemon.order}</p>
          </li>

          <li className="list-grid_item">
            <Icon_ruler/>
            <p className="small">Height</p>
            <p className="small">{this.props.pokemon.height}</p>
          </li>

        </ul>
        <div className="statistic">
          {this.props.pokemon.stats && this.props.pokemon.stats.map(stat=>{
            let figcaption = stat.name.replace(/[-_]/gi, " ")
            figcaption = figcaption.charAt(0).toUpperCase() + figcaption.slice(1);
            return (
              <figure key={stat.name}>
                <figcaption>{figcaption}</figcaption>
                <p><span className="stat">Base: {stat.base_stat}</span>, <span className="stat">Potential: {stat.potential}</span></p>
              </figure>
            )
          })}
        </div>



      </main>
    );
  }
}
const return_data = state => {
  let pokemon_id = get_active_pokemon_id(state);
  let pokemon = get_active_pokemon(state);
  return { pokemon, pokemon_id };
};
export default connect(return_data)(Page_library_item);
