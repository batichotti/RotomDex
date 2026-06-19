export type Abilities = {
  id: number
  name: string
  generation_introduced: string
  description: string
  short_description: string
}

export type PokemonAbilities = {
  pokemon_id: number
  pokemon_name: string
  ability_name: string
  ability_id: number
  ability_slot: number
  is_hidden: boolean
  ability: Abilities
}
