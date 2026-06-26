import type { Pokemon } from '@/types/pokemon'
import type { PokemonAbilities } from '@/types/abilities'
import { safeFetch } from '@/utils/safefetch'
import styles from './PokemonData.module.css'
import { EGG_GROUPS } from '@/utils/PokemonInfoMaps'
import Link from 'next/link'

function getEggGroup(egg_group: string){
    return EGG_GROUPS.find(opt => opt.key === egg_group)?.label ?? 'Egg Group';
}

export default async function PokemonData({ pokemon }: { pokemon: Pokemon }) {
    const data = await safeFetch<PokemonAbilities[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/pokemon-abilities/pokemon/${pokemon.id}`
    )

    const abilities = Array.isArray(data) ? data : []

    return (
        <>
            <div className={styles.container}>
                <h3>INFO</h3>
                { pokemon.egg_group_2 === "None" && (<p>egg group: {getEggGroup(pokemon.egg_group_1).toLowerCase()}</p>) }
                { pokemon.egg_group_2 !== "None" && (<p>egg groups: {getEggGroup(pokemon.egg_group_1).toLowerCase()}, {getEggGroup(pokemon.egg_group_2).toLowerCase()}</p>) }
                <p>height: { (pokemon.height / 100).toFixed(2) } m</p>
                <p>weight: { (pokemon.weight).toFixed(1) } kg</p>
            </div>

            {abilities.length > 0 && (
                <div className={styles.container}>
                    <h3>ABILITIES</h3>
                    <ul>
                        {abilities
                            .sort((a, b) => a.ability_slot - b.ability_slot)
                            .map((pa) => (
                                <li key={pa.ability_id}>
                                    <Link href={`/abilities/${pa.ability_name}`} ><span><b>{pa.ability.name.replaceAll('-', ' ')}</b></span></Link>
                                    {pa.is_hidden && <span>(hidden)</span>}
                                    {pa.ability.short_description && (
                                        <p>{pa.ability.short_description.toLowerCase()}</p>
                                    )}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </>
    )
}
