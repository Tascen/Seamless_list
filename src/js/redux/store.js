import { createStore, applyMiddleware, compose } from 'redux'
const ReduxThunk = require('redux-thunk').default
import { createLogger } from 'redux-logger'

import root_reducer from './reducers/all'
import * as items_by_type from './reducers/items_by_type'
import * as path_by_items from './reducers/path_by_items'

export const initialState = {
  [name.ITEMS_BY_TYPE]: items_by_type.initial_state,
  [name.PATH]: path_by_items.initial_state
}
const loggerMiddleware = createLogger()

let store = createStore(
  root_reducer,
  initialState,
  applyMiddleware(ReduxThunk, loggerMiddleware)
)



import * as name from "./rd_store_sections";
import { fetch_items } from './actions/all'




export default store
