"use client"

import { useState, useCallback } from "react"
import type { PokemonMove } from "@/types/moves"
import { redirect } from "next/navigation"
import styles from "./PokemonMoves.module.css"
import Link from "next/link"
import { TypeIconBadge } from "./TypeIconBadge"
const METHOD_ORDER = ["level-up", "egg", "machine", "tutor"]

type SortDir = 1 | -1 | 0
type SortCol = "level_learned_at" | "move.type" | "move.name" | "move.damage_class" | "move.pp" | "move.power"


function getNestedValue(obj: PokemonMove, col: SortCol): string | number | null {
    if (col === "level_learned_at") return obj.level_learned_at
    if (col === "move.type") return obj.move.type
    if (col === "move.name") return obj.move.name
    if (col === "move.damage_class") return obj.move.damage_class
    if (col === "move.pp") return obj.move.pp ?? null
    if (col === "move.power") return obj.move.power ?? null
    return null
}

function SortIcon({ dir }: { dir: SortDir }) {
    if (dir === 1) return <span className={styles.sortIcon} aria-hidden>↑</span>
    if (dir === -1) return <span className={styles.sortIcon} aria-hidden>↓</span>
    return <span className={`${styles.sortIcon} ${styles.sortIconInactive}`} aria-hidden>↑↓</span>
}

function useSortCycle(cols: SortCol[]) {
    const [sortCol, setSortCol] = useState<SortCol | null>(null)
    const [sortDir, setSortDir] = useState<SortDir>(0)

    const handleSort = useCallback((col: SortCol) => {
        if (sortCol !== col) {
            setSortCol(col)
            setSortDir(1)
        } else if (sortDir === 1) {
            setSortDir(-1)
        } else {
            setSortCol(null)
            setSortDir(0)
        }
    }, [sortCol, sortDir])

    const sort = useCallback((list: PokemonMove[]) => {
        if (!sortCol || sortDir === 0) return list
        return [...list].sort((a, b) => {
            const va = getNestedValue(a, sortCol)
            const vb = getNestedValue(b, sortCol)
            const nullFallback = sortDir === 1 ? Infinity : -Infinity
            const na = va ?? nullFallback
            const nb = vb ?? nullFallback
            if (typeof na === "string" && typeof nb === "string") {
                return sortDir * na.localeCompare(nb)
            }
            return sortDir * ((na as number) - (nb as number))
        })
    }, [sortCol, sortDir])

    const dirFor = (col: SortCol): SortDir =>
        sortCol === col ? sortDir : 0

    return { handleSort, sort, dirFor }
}

export default function PokemonMoves({ moves }: { moves: PokemonMove[] }) {
    const grouped = moves.reduce<Record<string, PokemonMove[]>>((acc, pm) => {
        const method = pm.move_learn_method
        if (!acc[method]) acc[method] = []
        acc[method].push(pm)
        return acc
    }, {})

    const methods = Object.keys(grouped).sort((a, b) => {
        const ia = METHOD_ORDER.indexOf(a)
        const ib = METHOD_ORDER.indexOf(b)
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib)
    })

    return (
        <div className={styles.container}>
            {methods.map((method) => (
                <MethodSection
                    key={method}
                    method={method}
                    moves={grouped[method]}
                />
            ))}
        </div>
    )
}

function MethodSection({ method, moves }: { method: string; moves: PokemonMove[] }) {
    const { handleSort, sort, dirFor } = useSortCycle([
        "level_learned_at", "move.type", "move.name",
        "move.damage_class", "move.pp", "move.power",
    ])

    const defaultSorted = [...moves].sort(
        (a, b) => a.level_learned_at - b.level_learned_at
    )
    const list = sort(defaultSorted)

    const th = (col: SortCol, label: string) => (
        <th
            className={styles.sortableHeader}
            onClick={() => handleSort(col)}
            aria-sort={
                dirFor(col) === 1 ? "ascending"
                    : dirFor(col) === -1 ? "descending"
                        : "none"
            }
        >
            {label}
            <SortIcon dir={dirFor(col)} />
        </th>
    )

    return (
        <section className={styles.section}>
            <h3 className={styles.sectionTitle}>{method.replaceAll('-', ' ')}</h3>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead className={styles.tableHead}>
                        <tr>
                            {method === "level-up" && th("level_learned_at", "Level")}
                            {th("move.type", "Type")}
                            {th("move.name", "Name")}
                            {th("move.damage_class", "Category")}
                            {th("move.pp", "PP")}
                            {th("move.power", "Damage")}
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((pm) => (
                            <tr
                                key={`${pm.move_id}-${pm.move_learn_method}`}
                                className={styles.row}
                                onClick={() => redirect(`/moves/${pm.move.name}`)}
                                style={{ cursor: "pointer" }}
                            >
                                {method === "level-up" && (
                                    <td className={`${styles.cell} ${styles.levelCell}`}>
                                        {pm.level_learned_at}
                                    </td>
                                )}
                                <td className={`${styles.cell} ${styles.typeCell}`}>
                                    <TypeIconBadge type={pm.move.type} width={35} height={35} />
                                </td>
                                <td className={`${styles.cell}`}>
                                    <Link href={`/moves/${pm.move.name}`}>
                                        {pm.move.name.replaceAll("-", " ")}
                                    </Link>
                                </td>
                                <td className={`${styles.cell} ${styles.categoryCell}`}>
                                    {pm.move.damage_class}
                                </td>
                                <td className={`${styles.cell} ${styles.numberCell}`}>
                                    {pm.move.pp}
                                </td>
                                <td className={`${styles.cell} ${styles.numberCell}`}>
                                    {(pm.move.power || pm.move.damage_class === "Status") ?? <span className={styles.dash}>--</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}