let React = require('react');
import { connect } from "react-redux";

import {Btn_arrow} from "../inputs/button_arrow"

import getHistory from 'react-router-global-history';


export function Header(props) {
  return (
    <header className={props.background ? "with_background" : ''}>
      {props.background &&
        <div className="header_background">
          <img src={props.background_src}/>
          <h4>{props.background_title}</h4>
        </div>
      }
      {props.back_button && <Btn_arrow onClick={getHistory().goBack} className={"btn-back"} />}
      {props.title}
    </header>
  )
}
