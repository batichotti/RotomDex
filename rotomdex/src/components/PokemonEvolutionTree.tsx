import type { Evolution } from '@/types/evolutions'
import styles from './PokemonEvolutionTree.module.css'
import PokemonEvolutionCard from './PokemonEvolutionCard'

type EvolutionNode = {
    data: Evolution
    children: EvolutionNode[]
}

function buildTree(evolutions: Evolution[]): EvolutionNode[] {
    const map = new Map<number, EvolutionNode>()

    for (const evo of evolutions) {
        map.set(evo.pokemon_id, { data: evo, children: [] })
    }

    const roots: EvolutionNode[] = []

    for (const node of map.values()) {
        if (node.data.evolves_from_id === null) {
            roots.push(node)
        } else {
            map.get(node.data.evolves_from_id)?.children.push(node)
        }
    }

    return roots
}

function EvolutionBranch({ node }: { node: EvolutionNode }) {
    return (
        <div className={styles.branch}>
            <PokemonEvolutionCard pokemonId={node.data.pokemon_id} />

            {node.children.length > 0 && (
                <div className={styles.children}>
                    {node.children.map((child) => (
                        <div key={child.data.pokemon_id} className={styles.childWrapper}>
                            <div className={styles.arrow}>
                                <span className={styles.method}>{child.data.evolution_method}</span>
                                <span>→</span>
                            </div>
                            <EvolutionBranch node={child} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function PokemonEvolutionTree({ evolution }: { evolution: Evolution[] | null }) {
    if (!evolution || evolution.length === 0) {
        return <p>Nenhuma evolução encontrada.</p>
    }

    const roots = buildTree(evolution)

    return (
        <div className={styles.pokemonTree}>
            {roots.map((root) => (
                <EvolutionBranch key={root.data.pokemon_id} node={root} />
            ))}
        </div>
    )
}