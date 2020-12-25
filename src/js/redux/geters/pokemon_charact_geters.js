import * as name from "../rd_store_sections";


export const get_egg_groups = (store) => {
  let items = store?.[name.ITEMS_BY_TYPE][name.items_type.EGG_GROUPS]?.items || []
  items = items.map(item=>{
    return {
      title: item.name,
      id: item.id,
      species: item.pokemon_species
    }
  })
  items = items || []
  return items
};

export const get_habitats = (store) => {
  let items = store?.[name.ITEMS_BY_TYPE][name.items_type.HABITATS]?.items || []
  items = items.map(item=>{
    return {
      title: item.name,
      id: item.id,
      species: item.pokemon_species
    }
  })
  items = items || []
  return items
};

export const get_genders = (store) => {
  let items = store?.[name.ITEMS_BY_TYPE][name.items_type.GENDERS]?.items || []
  items = items.map(item=>{
    return {
      title: item.name,
      id: item.id,
      species: item.pokemon_species
    }
  })
  items = items || []
  return items
};

export const get_growth_rates = (store) => {
  let items = store?.[name.ITEMS_BY_TYPE][name.items_type.GROWTH_RATES]?.items || []
  items = items.map(item=>{
    return {
      title: item.name,
      id: item.id,
      species: item.pokemon_species
    }
  })
  items = items || []
  return items
};
