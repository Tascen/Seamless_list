import React, { useState } from 'react';

export function Btn(props) {
  return (
    <button
      onClick={typeof (props.onClick) == 'function' ? props.onClick : null}
      type="button"
      name={props.name ? props.name : null}
      className={props.className ? props.className + ' ' + "btn" : "btn"}
    >
      {props.icon}
      {props.title}
    </button>
  )
}
