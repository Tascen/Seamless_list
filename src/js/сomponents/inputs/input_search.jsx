import React, { useState } from 'react';

import {Btn} from "./button.jsx"
import { Icon_cross, Icon_magnifier } from "../svg"

let onchange_Input = (event, props, changer) => {
  changer(event.currentTarget.value)
  let containre = event.currentTarget.parentNode
  !!event.currentTarget.value ? containre.classList.remove('empty') : containre.classList.add('empty')
  typeof (props.onChange) == 'function' ? props.onChange(event, event.currentTarget.value) : null
}

export function Input_search(props){
  const [input_value, change] = React.useState('');
  return (
    <label className="input_search empty">
      <Icon_magnifier />
      <input placeholder={props.placeholder || "Search"} onChange={event=>{onchange_Input(event, props, change)}} type="text" value={input_value} name={props.name ? props.name : null}/>
      <Btn onClick={(event)=>{change(''); event.currentTarget.parentNode.classList.add('empty')}} icon={<Icon_cross />} className="delete"/>
    </label>
  )
}
