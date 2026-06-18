import { Suspense } from 'react'
import FilterBar from '@/components/FilterBar'
import PokemonFilters from '@/components/PokemonFilters'

export default function PokemonErrorState({ message }: { message: string }) {
  return (
    <div style={{ paddingTop: 'var(--filterbar-height)' }}>
      <Suspense fallback={<div>Carregando filtros...</div>}>
        <FilterBar>
          <PokemonFilters />
        </FilterBar>
      </Suspense>
      <h1>RotomDex</h1>
      <p style={{ color: 'red' }}>{message}</p>
    </div>
  )
}