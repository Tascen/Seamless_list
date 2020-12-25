import React, { useState, useRef } from 'react';

import {Btn_arrow} from "./button_arrow.jsx"
import { Icon_triangle } from "../svg"

export class Input_list extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();

    this.state = {
      selected_item: this.props.selected_item || 0,
      list_closed: true,
    };

    this.change_list_closed = this.change_list_closed.bind(this);
    this.close_when_missDown = this.close_when_missDown.bind(this);

    this.change_selected_item = this.change_selected_item.bind(this);
  }

  change_list_closed() {
    let list_closed = this.state.list_closed

    if (list_closed) {
      this.setState({
        list_closed: false
      })
      window.addEventListener('mousedown', this.close_when_missDown, true )
    } else {
      this.setState({
        list_closed: true
      })
      window.removeEventListener('mousedown', this.close_when_missDown, true )
    }
  }

  close_when_missDown(event) {
    let down_on_container = false, path = event.composedPath()

    for (let i = 0; i < path.length; i++) {
      if ( path[i].isEqualNode?.(this.container.current) ) {
        down_on_container = true;
        break;
      }
    }
    if (!down_on_container) {
      this.setState({list_closed: true})
      window.removeEventListener('mousedown', this.close_when_missDown, true )
    }
  }

  change_selected_item(event) {
    let item = event.target.closest('li[data-key]')
    if (item.getAttribute('data-key') != this.state.selected_item) {
      typeof(this.props.onChange) == 'function' ? this.props.onChange(item.getAttribute('data-key')) : null
    }

    item.parentNode.children[this.state.selected_item].classList.remove('selected')
    item.classList.add('selected')
    this.setState({
      selected_item: item.getAttribute('data-key')
    })

  }

  render() {
    return (
      <div ref={this.container} data-title={this.props.title || 'sort by'} className="input_list">
        <ul onClick={this.change_selected_item} className={this.state.list_closed ? "input_list_items closed" : "input_list_items"}>
          {this.props.items instanceof Array && this.props.items.map((item, index) =>
            <li key={item.id} data-key={item.id}>{item.title}</li>
          )}
        </ul>

        <div className="input_list_head">
          <p className="input_list_selected_item">
            {this.props.items instanceof Array && this.props.items.map((item, i) => {
              if (item.id == this.state.selected_item) {
                return item.title
              }
            })}
          </p>
          {!this.props.loced && <Btn_arrow onClick={this.change_list_closed} dir="right"/>}

        </div>

      </div>
    );
  }
}
