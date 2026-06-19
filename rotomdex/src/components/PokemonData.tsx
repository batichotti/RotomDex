import type { Pokemon } from '@/types/pokemon'
import type { PokemonAbilities } from '@/types/abilities'
import { safeFetch } from '@/utils/safefetch'
import styles from './PokemonData.module.css'

export default async function PokemonData({ pokemon }: { pokemon: Pokemon }) {
    const data = await safeFetch<PokemonAbilities[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/pokemon-abilities/pokemon/${pokemon.id}`
    )

    const abilities = Array.isArray(data) ? data : []

    return (
        <>
            <div className={styles.text}>
                <h3>INFO</h3>
                { pokemon.egg_group_2 === "None" && (<p>Egg Group: {pokemon.egg_group_1.replaceAll("-", " ")}</p>) }
                { pokemon.egg_group_2 !== "None" && (<p>Egg Groups: {pokemon.egg_group_1.replaceAll("-", " ")}, {pokemon.egg_group_2.replaceAll("-", " ")}</p>) }
                <p>Height: { (pokemon.height / 100).toFixed(2) } m</p>
                <p>Weight: { (pokemon.weight).toFixed(1) } kg</p>
            </div>

            {abilities.length > 0 && (
                <div className={styles.text}>
                    <h3>ABILITIES</h3>
                    <ul>
                        {abilities
                            .sort((a, b) => a.ability_slot - b.ability_slot)
                            .map((pa) => (
                                <li key={pa.ability_id}>
                                    <span className="capitalize"><b>{pa.ability.name}</b></span>
                                    {pa.is_hidden && <span> (hidden)</span>}
                                    {pa.ability.short_description && (
                                        <p>{pa.ability.short_description}</p>
                                    )}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </>
    )
}
