import styles from './page.module.css'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import type { Move } from '@/types/moves'
import { capitalize, formatStat } from '@/utils/utils'
import { TYPE_COLORS } from '@/utils/TypeColors'
import { TypeIconBadge } from '@/components/TypeIconBadge'
import { GENERATION_MAP } from '@/utils/PokemonInfoMaps'

function formatGeneration(generation: string) {
  if (!generation.includes('-')) return capitalize(generation)
  const [word, numeral] = generation.split('-')
  return `${capitalize(word)} ${numeral.toUpperCase()}`
}

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
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1>Movimento não encontrado</h1>
        </div>
      </div>
    )
  }

  const move: Move = (await res.json())[0]

  if (!move) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1>Movimento não encontrado</h1>
        </div>
      </div>
    )
  }

  if (id !== move.name){
    redirect(`/moves/${move.name}`)
  }

  const moveColor = TYPE_COLORS[move.type as keyof typeof TYPE_COLORS] ?? '#A0A3A0'

  return (
    <div className={styles.page}>
      <article className={styles.card}>
        <div className={styles.header}>
          <span className={styles.genBadge}>{GENERATION_MAP[move.generation_introduced as keyof typeof GENERATION_MAP]}</span>
          <span className={styles.categoryBadge}>{move.category ?? '-'}</span>
        </div>

        <div className={styles.iconWrap}>
          <div
            className={styles.iconGlow}
            style={{ backgroundImage: `radial-gradient(circle, ${moveColor}45, transparent 70%)` }}
            aria-hidden="true"
          />
          <div className={styles.iconBadge}>
            <TypeIconBadge type={move.type} width={120} height={120} />
          </div>
        </div>

        <h1 className={styles.name}>{move.name.replaceAll('-', ' ')}</h1>

        <div className={styles.damageClass}>
          <Image
            src={`/assets/flags/${capitalize(move.damage_class)}Move.svg`}
            alt={capitalize(move.damage_class)}
            width={50}
            height={50}
          />
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Power</span>
            <span className={styles.statValue}>{formatStat(move.power)}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Accuracy</span>
            <span className={styles.statValue}>{formatStat(move.accuracy)}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>PP</span>
            <span className={styles.statValue}>{move.pp}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Priority</span>
            <span className={styles.statValue}>{move.priority}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Effect Chance</span>
            <span className={styles.statValue}>
              {move.effect_chance ? `${move.effect_chance}%` : ''}
            </span>
          </div>
        </div>

        {move.short_description && (
          <>
            <div className={styles.divider} aria-hidden="true" />
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Short Description</h2>
              <p className={styles.sectionText}>{move.short_description}</p>
            </section>
          </>
        )}

        {move.description && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Description</h2>
            <p className={styles.sectionText}>{move.description}</p>
          </section>
        )}
      </article>
    </div>
  )
}