'use client'

import styles from '@/components/OrderBar.module.css'
import { useRouter, useSearchParams } from 'next/navigation'

const SORT_OPTIONS = [
  { label: '#',       value: 'species_id',      defaultOrder: 'ASC'  },
  { label: 'Name',    value: 'name',            defaultOrder: 'ASC'  },
  { label: 'HP',      value: 'hp',              defaultOrder: 'DESC' },
  { label: 'Atk',     value: 'attack',          defaultOrder: 'DESC' },
  { label: 'Def',     value: 'defense',         defaultOrder: 'DESC' },
  { label: 'SpA',     value: 'special_attack',  defaultOrder: 'DESC' },
  { label: 'SpD',     value: 'special_defense', defaultOrder: 'DESC' },
  { label: 'Spe',     value: 'speed',           defaultOrder: 'DESC' },
  { label: 'BST',     value: 'bst',             defaultOrder: 'DESC' },
  { label: 'Height',  value: 'height',          defaultOrder: 'DESC' },
  { label: 'Weight',  value: 'weight',          defaultOrder: 'DESC' },
  // { label: '?',       value: 'species_id',      defaultOrder: 'ASC'  }
]

interface OrderBarProps {
  path: string
  total?: number
  species?: number
}

export default function OrderBar({ path, total, species }: OrderBarProps) {
  const router = useRouter()
  const params = useSearchParams()

  const currentOrderBy = params.get('orderBy')
  const currentOrder   = params.get('order')

  function handleClick(value: string) {
    const current = new URLSearchParams(params.toString())
    const option = SORT_OPTIONS.find(o => o.value === value)!

    if (currentOrderBy !== value) {
      current.set('orderBy', value)
      current.set('order', option.defaultOrder)
    } else if (currentOrder === option.defaultOrder) {
      // Segundo clique → direção oposta
      current.set('order', option.defaultOrder === 'ASC' ? 'DESC' : 'ASC')
    } else {
      // Terceiro clique → limpa
      current.delete('orderBy')
      current.delete('order')
    }

    router.push(`${path}?${current.toString()}`)
  }

  return (
    <div className={styles.bar}>
      {(total !== undefined && species !== undefined) && (
        <div className={styles.info}>
          <h1 className={styles.title}>RotomDex</h1>
          <div className={styles.counts}>
            <span>Pokémon (Species): {total} ({species})</span>
          </div>
        </div>
      )}
      <div className={styles.sortButtons}>
        {SORT_OPTIONS.map(({ label, value }) => {
          const isActive = currentOrderBy === value
          const arrow = isActive ? (currentOrder === 'ASC' ? ' ▲' : ' ▼') : ''
          const hasImage = value === 'weight' || value === 'height'

          return (
            <button
              key={value}
              className={`${styles.sortBtn} ${isActive ? styles.sortBtnActive : ''}`}
              onClick={() => handleClick(value)}
            >
              {hasImage ? (
                <img
                  src={`/assets/flags/${value}_flag.svg`}
                  alt={`${label} flag`}
                  height={24}
                  width={24}
                />
              ) : (
                label
              )}
              {arrow}
            </button>
          )
        })}
      </div>
    </div>
  )
}