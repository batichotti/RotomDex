export type Pokemon = {
    id: number
    numeral: number
    name:string
    species_id: number
    species_name: string
    generation: string
    is_legendary: boolean
    is_mythical: boolean
    is_baby: boolean
    has_gender_differences: boolean
    forms_switchable: boolean
    is_mega: boolean
    is_gmax: boolean
    is_regional_form: boolean
    egg_group_1: string
    egg_group_2: string
    primary_type: string
    secondary_type: string
    hp: number
    attack: number
    defense: number
    special_attack: number
    special_defense: number
    speed: number
    bst: number
    height: number
    weight: number
    base_experience: number
}