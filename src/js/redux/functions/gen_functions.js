import * as name from "../rd_store_sections";

export function contains_section(store, section_name) {
  return store[name.ITEMS_BY_TYPE][name.items_type.section_name] &&
  store[name.ITEMS_BY_TYPE][name.items_type.section_name].items instanceof Array &&
  store[name.ITEMS_BY_TYPE][name.items_type.section_name].items.length
}

export function section_locked(store, section_name) {
  return store[name.ITEMS_BY_TYPE][name.items_type.section_name] &&
    store[name.ITEMS_BY_TYPE][name.items_type.section_name].is_fetching
}
