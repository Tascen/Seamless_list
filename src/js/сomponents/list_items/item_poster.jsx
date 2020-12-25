let React = require('react');

import { Link } from "react-router-dom";
import { Icon_order } from "../svg";

export function Item_poster(props) {
  return (
    <Link onClick={typeof(props.onClick) == 'function' ? props.onClick : null} to={props.link_to}>
      <article data-id={props.id} className="item_poster">
          <img className="item_poster_cover" src={props.cover_src} />
          <p className="item_poster_title">{props.title}</p>
          <p className="item_poster_desc">{props.desc}</p>

          <p className="line"><span className="xp" title="base experience">{props.xp}</span><span className="order" title="order"><Icon_order/>{props.order}</span></p>
      </article>
    </Link>
  )
}
