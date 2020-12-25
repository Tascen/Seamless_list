import { combineReducers } from 'redux'
import { CHANGE_PATH, SELECT_ITEMS_TYPE, INVALIDATE_ITEMS_TYPE, REQUEST_ITEMS, RECEIVE_ITEMS } from '../actionTypes'
import * as name from "../rd_store_sections";
import {items_by_type} from "./items_by_type";
import {path_by_items} from "./path_by_items";







let root_reducer = {}
root_reducer[name.ITEMS_BY_TYPE] = items_by_type
root_reducer[name.PATH] = path_by_items
export default combineReducers(root_reducer)
