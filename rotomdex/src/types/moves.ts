export type Move = {
    id: number
    name: string
    accuracy: number | null
    power: number | null
    type: string
    pp: number
    effect_chance: number | null
    priority: number
    damage_class: string
    generation_introduced: string
    description: string | null
    short_description: string | null
    category: string | null
}

export type PokemonMove = {
    pokemon_id: number
    pokemon_name: string
    move_name: string
    move_id: number
    level_learned_at: number
    move_learn_method: string
    most_recent_game_learned_in: string
    move: Move
}