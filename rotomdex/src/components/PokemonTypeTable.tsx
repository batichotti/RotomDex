import type { TypeEffectiveness } from "@/types/type"
import Image from "next/image"
import { capitalize } from "@/utils/utils"
import { TYPE_COLORS } from "@/utils/TypeColors"
import styles from "./PokemonTypeTable.module.css"
import { TypeIconBadge } from "./TypeIconBadge"

const COLUMNS = 9

function chunk<T>(arr: T[], size: number): T[][] {
    const result: T[][] = []
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size))
    }
    return result
}

export default function PokemonTypeTable({ types }: { types: TypeEffectiveness[] }) {
    const blocks = chunk(types, COLUMNS)

    return (
        <div className={styles.container}>
            <div className={styles.gridWrapper}>
                {blocks.map((block, blockIndex) => (
                    <div key={blockIndex} className={styles.block}>
                        <div className={styles.iconRow}>
                            {block.map((entry) => {
                                const key = entry.attack_type.toLowerCase()

                                return (
                                    <div
                                        key={entry.attack_type}
                                        className={styles.iconCell}
                                        title={capitalize(key)}
                                    >
                                        <TypeIconBadge type={key} width={45} height={45}/>
                                    </div>
                                )
                            })}
                        </div>

                        <div className={styles.valueRow}>
                            {block.map((entry) => {
                                const value = "product" in entry ? entry.product : entry.effectiveness
                                const isNeutral = value === 1
                                let valueClass = ""
                                if (value === 4) {
                                    valueClass = styles.extremeEffective
                                } else if (value === 2) {
                                    valueClass = styles.effective
                                } else if (value === 0) {
                                    valueClass = styles.immune
                                } else if (value === 0.25) {
                                    valueClass = styles.extremeNotEffective
                                } else if (value === 0.5) {
                                    valueClass = styles.notEffective
                                }

                                return (
                                    <div key={entry.attack_type} className={styles.valueCell}>
                                        {!isNeutral && (
                                            <span className={`${styles.value} ${valueClass}`}>
                                                {value}
                                            </span>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}