let React = require('react');
import { connect } from "react-redux";

import {Btn_arrow} from "../inputs/button_arrow"

import getHistory from 'react-router-global-history';


export function Slider(props) {
  const [active_item, change] = React.useState(props.default || 0);
  return (
    <div className="slider">

      <Btn_arrow onClick={change.bind(null, (active_item - 1) <= 0 ? 0 : active_item - 1)} className={active_item <= 0 ? 'loced' : null} />
      <div className="slider_items" style={{"--active_item_index": active_item}}>
        {props.items.length != 0 && props.items.map((item, i) =>(
          <article key={item.id} className={i == active_item ? "item active": "item"}>
            <img src={item.src} alt={item.alt}/>
          </article>
        ))}
      </div>
      <Btn_arrow onClick={change.bind(null, (active_item + 1) >= (props.items.length - 1) ? props.items.length - 1 : active_item + 1)} className={active_item >= (props.items.length - 1) ? 'loced' : null}  dir="right"/>

    </div>
  )
}
