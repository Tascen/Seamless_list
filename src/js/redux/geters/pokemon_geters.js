import * as name from "../rd_store_sections";



export const get_last_pokemon_id = (store) => {

  let id, items = store?.[name.ITEMS_BY_TYPE][name.items_type.POKEMONS]?.items

  if (items == undefined || !items.length) {
    return -1;
  } else {
    id = items[items.length - 1].id
  }

  return id || -1
};

export const get_pokemons = (store) => {
  let items = store?.[name.ITEMS_BY_TYPE][name.items_type.POKEMONS]?.items || []

  return items
};

export const get_active_pokemon = (store) => {
  let pokemon_id = store?.[name.PATH][name.path_chunk.POKEMON], pokemon = {
    nullOBJ: true,
    id: "0",
    name: "Noname",
    sprites: [],
    order: null,
    height: null,
    stats: [
      {
        name: "Hp",
        base_stat: null,
        potential: null
      },
      {
        name: "Attack",
        base_stat: null,
        potential: null
      },
      {
        name: "Defense",
        base_stat: null,
        potential: null
      },
      {
        name: "Special attack",
        base_stat: null,
        potential: null
      },
      {
        name: "Special defense",
        base_stat: null,
        potential: null
      },
      {
        name: "Speed",
        base_stat: null,
        potential: null
      },
    ]
  }

  store?.[name.ITEMS_BY_TYPE][name.items_type.POKEMONS]?.items.forEach(item=>{
    if (item.id == pokemon_id) {
      pokemon = {
        id: item.id,
        name: item.name,
        sprites: [
          {
            id: "official_artwork",
            src: item.sprites.other["official-artwork"].front_default,
            alt: "Official artwork"
          },
          {
            id: "dream_world",
            src: item.sprites.other["dream_world"].front_default,
            alt: "Dream world"
          },
          {
            id: "front_default",
            src: item.sprites.front_default,
            alt: "Front default"
          },
          {
            id: "back_default",
            src: item.sprites.back_default,
            alt: "Back default"
          },
          {
            id: "front_shiny",
            src: item.sprites.front_shiny,
            alt: "Front shiny"
          },
          {
            id: "back_shiny",
            src: item.sprites.back_shiny,
            alt: "Back shiny"
          }
        ],
        order: item.order || null,
        height: item.height || null,
        stats: item.stats?.map(item=>{
          return {
            name: item.stat.name,
            base_stat: item.base_stat || null,
            potential: null
          }
        })
      }
    }
  })

  return pokemon
};

export const get_active_pokemon_id = (store) => {
  return store?.[name.PATH][name.path_chunk.POKEMON] || -1
};
