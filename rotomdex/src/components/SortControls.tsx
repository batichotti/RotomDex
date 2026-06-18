'use client'

import styles from './PokemonFilters.module.css'

const ORDER_BY = ['id','species_id','name','attack','bst','defense','hp','special_attack','special_defense','speed','height','weight']

interface SortControlsProps {
    orderBy: string
    order: string
    onOrderByChange: (value: string) => void
    onOrderChange: (value: string) => void
}

export default function SortControls({ orderBy, order, onOrderByChange, onOrderChange }: SortControlsProps) {
    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            {/* Campo de ordenação */}
            <select
                className={styles.select}
                value={orderBy}
                onChange={e => onOrderByChange(e.target.value)}
            >
                {ORDER_BY.map(o => (
                    <option key={o} value={o}>{o}</option>
                ))}
            </select>

            {/* Direção da ordenação */}
            <select
                className={styles.select}
                value={order}
                onChange={e => onOrderChange(e.target.value)}
            >
                <option value='ASC'>ASC</option>
                <option value='DESC'>DESC</option>
            </select>
        </div>
    )
}