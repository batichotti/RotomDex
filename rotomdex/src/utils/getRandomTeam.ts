// actions/getRandomTeam.ts
"use server";

import type { Pokemon } from "@/types/pokemon";
import type { PokemonMove } from "@/types/moves";
import type { PokemonAbilities } from "@/types/abilities";
import { safeFetch } from "@/utils/safefetch";
import { shouldShow } from "@/utils/PokemonMap";

function shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export type TeamData = {
    team: Pokemon[];
    randomMoves: PokemonMove[][];
    randomAbility: (PokemonAbilities | undefined)[];
};

export async function getRandomTeam(): Promise<TeamData> {
    const pokemonRes = await safeFetch<Pokemon[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/pokemon?isMega=false&isGmax=false`
    );
    const pokemon = pokemonRes ?? [];
    const pokemonById = new Map<number, Pokemon>(pokemon.map(p => [p.id, p]));
    const shownPokemon = pokemon.filter(p => shouldShow(p, pokemonById.get(p.species_id), "true"));
    const team = shuffle(shownPokemon).slice(0, 6);

    const moves = await Promise.all(
        team.map(p =>
            safeFetch<PokemonMove[]>(
                `${process.env.NEXT_PUBLIC_API_URL}/pokemon-moves/pokemon/${p.species_id}`
            )
        )
    );
    const randomMoves = moves.map(pokemonMoves => shuffle(pokemonMoves ?? []).slice(0, 4));

    const abilities = await Promise.all(
        team.map(p =>
            safeFetch<PokemonAbilities[]>(
                `${process.env.NEXT_PUBLIC_API_URL}/pokemon-abilities/pokemon/${p.species_id}`
            )
        )
    );
    const randomAbility = abilities.map(pokemonAbilities => shuffle(pokemonAbilities ?? [])[0]);

    return { team, randomMoves, randomAbility };
}