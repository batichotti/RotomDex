import Image from 'next/image'
import type { Items } from '@/types/items'
import { capitalize, formatStat } from '@/utils/utils'
import styles from './page.module.css'
import { redirect } from 'next/navigation'

export default async function ItemsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`)

    if (!res.ok) {
        return (
            <div className={styles.page}>
                <div className={styles.notFound}>
                    <h1>Item não encontrado</h1>
                </div>
            </div>
        )
    }

    const item: Items = (await res.json())[0] // Converte a resposta da API em um json, e em array

    if (!item) {
        return (
            <div className={styles.page}>
                <div className={styles.notFound}>
                    <h1>Item não encontrado</h1>
                </div>
            </div>
        )
    }

    if (id !== item.name){
      redirect(`/items/${item.name}`);
    }

    return (
        <div className={styles.page}>
            <article className={styles.card}>
                <div className={styles.header}>
                    <span className={styles.idBadge}>Nº {String(item.id).padStart(3, '0')}</span>
                    <span className={styles.categoryBadge}>{capitalize(item.category)}</span>
                </div>

                <div className={styles.iconSlot}>
                    <Image
                        src={`/assets/items/${item.name}.png`} // ajuste o caminho conforme a convenção de assets de items do projeto
                        alt={capitalize(item.name)}
                        width={64}
                        height={64}
                        className={styles.iconImg}
                    />
                </div>

                <h1 className={styles.name}>{capitalize(item.name)}</h1>

                <div className={styles.divider} aria-hidden="true" />

                <div className={styles.statsGrid}>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Cost</span>
                        <span className={styles.statValue}>
                            {item.cost ? `${formatStat(item.cost)}₽` : formatStat(item.cost)}
                        </span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Fling Power</span>
                        <span className={styles.statValue}>{formatStat(item.fling_power)}</span>
                    </div>
                </div>

                {item.description && (
                    <>
                        <div className={styles.divider} aria-hidden="true" />
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Description</h2>
                            <p className={styles.sectionText}>{capitalize(item.description)}</p>
                        </section>
                    </>
                )}
            </article>
        </div>
    )
}