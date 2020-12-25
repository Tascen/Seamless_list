import React from 'react';


import {Icon_triangle_left, Icon_triangle_right } from "../svg"

export function Btn_arrow(props) {
  return (
    <button
      onClick={typeof (props.onClick) == 'function' ? props.onClick : null}
      type="button"
      className={props.className ? props.className + ' ' + "btn-arrow" : "btn-arrow"}
    >
      {(props.dir == "right") && <Icon_triangle_right />}
      {!props.dir && <Icon_triangle_left />}
    </button>
  )
}
