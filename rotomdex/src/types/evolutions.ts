export type Evolution = {
    pokemon_name: string;
    pokemon_id: number;
    species_id: number;
    evolves_from_name: string | null;
    evolves_from_id: number | null;
    evolves_from_species_id: number | null;
    evolution_method: string | null;
    evolution_stage: number;
    is_fully_evolved: boolean;
}