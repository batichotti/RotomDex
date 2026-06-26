import type { Abilities } from '@/types/abilities'
import styles from './page.module.css'
import { redirect } from 'next/navigation'
import { GENERATION_MAP } from '@/utils/PokemonInfoMaps'

export default async function AbilitiesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/abilities/${id}`)

    if (!res.ok) {
        return (
            <div className={styles.page}>
                <div className={styles.notFound}>
                    <h1>Habilidade não encontrada</h1>
                </div>
            </div>
        )
    }

    const abilitie: Abilities = (await res.json())[0] // Converte a resposta da API em um json, e em array

    if (!abilitie) {
        return (
            <div className={styles.page}>
                <div className={styles.notFound}>
                    <h1>Habilidade não encontrada</h1>
                </div>
            </div>
        )
    }

    if (id !== abilitie.name) {
        redirect(`/abilities/${abilitie.name}`);
    }

    return (
        <div className={styles.page}>
            <article className={styles.card}>
                <div className={styles.header}>
                    <span className={styles.idBadge}>Nº {String(abilitie.id).padStart(3, '0')}</span>
                    <span className={styles.genBadge}>{GENERATION_MAP[abilitie.generation_introduced as keyof typeof GENERATION_MAP]}</span>
                </div>

                <h1 className={styles.name}>{abilitie.name}</h1>

                <p className={styles.tagline}>{abilitie.short_description}</p>

                <div className={styles.divider} aria-hidden="true" />

                <p className={styles.description}>{abilitie.description}</p>
            </article>
        </div>
    )
}