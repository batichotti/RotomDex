import styles from './page.module.css'
import Image from 'next/image'
import type { Move } from '@/types/moves'
import { capitalize, formatStat } from '@/utils/utils'
import { TYPE_COLORS } from '@/utils/TypeColors'
import { TypeIconBadge } from '@/components/TypeIconBadge'

export default async function MovesPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/moves/${id}`
  )

  if (!res.ok) {
    return <h1>Movimento não encontrado</h1>
  }

  const move: Move = (await res.json())[0]

  if (!move) {
    return <h1>Movimento não encontrado</h1>
  }

  const moveColor = TYPE_COLORS[move.type as keyof typeof TYPE_COLORS] ?? '#A0A3A0'

  return (
    <div className={styles.card}>
      <div className={styles.header}>

        <div className={styles.title}>
          <h1>{capitalize(move.name)}</h1>
        </div>
      </div>

      <div>
        <div>
          <TypeIconBadge type={move.type} width={120} height={120}/>
        </div>
      </div>

      <div className={styles.name}>
        <Image src={`/assets/flags/${capitalize(move.damage_class)}Move.svg`} alt={`${capitalize(move.damage_class)}`} width={100} height={100}/>
      </div>

      <div className={styles.type}>
        Category: {move.category ?? '-'}
      </div>

      <p>
        <strong>Power:</strong> {formatStat(move.power)}
      </p>

      <p>
        <strong>Accuracy:</strong> {formatStat(move.accuracy)}
      </p>

      <p>
        <strong>PP:</strong> {move.pp}
      </p>

      <p>
        <strong>Priority:</strong> {move.priority}
      </p>

      <p>
        <strong>Effect Chance:</strong>{' '}
        {move.effect_chance
          ? `${move.effect_chance}%`
          : '-'}
      </p>

      <p>
        <strong>Generation:</strong>{' '}
        {capitalize(move.generation_introduced)}
      </p>

      {move.short_description && (
        <>
          <h2>Short Description</h2>
          <p>{move.short_description}</p>
        </>
      )}

      {move.description && (
        <>
          <h2>Description</h2>
          <p>{move.description}</p>
        </>
      )}
    </div>
  )
}