'use client'

import styles from './PokemonFilters.module.css'
import { TYPE_COLORS } from './TypeIcon'

const TYPES = ['bug','dark','dragon','electric','fairy','fighting','fire','flying','ghost','grass','ground','ice','normal','poison','psychic','rock','steel','water']

interface TypeButtonGroupProps {
    selectedType: string
    selectedType2: string
    onTypeClick: (type: string) => void
    onClear: () => void
}

export default function TypeButtonGroup({ selectedType, selectedType2, onTypeClick, onClear }: TypeButtonGroupProps) {
    const bothSelected = !!selectedType && !!selectedType2
    const hasSelection = !!selectedType || !!selectedType2
    const showUnique = !!selectedType && (!bothSelected || selectedType2 === "None")
    const showClear = hasSelection

    function getButtonClass(t: string) {
        const isSelected = selectedType === t || selectedType2 === t
        const isBlocked = bothSelected && !isSelected

        if (isSelected) return `${styles.typeButton} ${styles.typeButtonActive}`
        if (isBlocked)  return `${styles.typeButton} ${styles.typeButtonInactive}`
        return styles.typeButton
    }

    function getTitle(t: string) {
        if (selectedType === t)  return `${t} (primário — clique para remover)`
        if (selectedType2 === t) return `${t} (secundário — clique para remover)`
        if (bothSelected)        return `${t} (bloqueado)`
        if (selectedType)        return `${t} (definir como secundário)`
        return `${t} (definir como primário)`
    }

    function hexToRgb(hex: string) {
        const normalized = hex.trim().replace(/^#/, '')
        const fullHex = normalized.length === 3
            ? normalized.split('').map(char => char + char).join('')
            : normalized
        const r = parseInt(fullHex.slice(0, 2), 16)
        const g = parseInt(fullHex.slice(2, 4), 16)
        const b = parseInt(fullHex.slice(4, 6), 16)
        return `${r}, ${g}, ${b}`
    }

    function getCircleStyle(t: string) {
        const isSelected = selectedType === t || selectedType2 === t
        if (isSelected) {
            return {
                backgroundColor: `rgba(${hexToRgb(TYPE_COLORS[t as keyof typeof TYPE_COLORS])}, 0.6)`
            }
        }
        return {}
    }

    const uniqueCircleStyle = selectedType2 === 'None'
        ? { backgroundColor: `rgba(${hexToRgb(TYPE_COLORS[selectedType as keyof typeof TYPE_COLORS])}, 0.6)` }
        : {}

    return (
        <div className={styles.typeButtonsWrapper}>
            <div className={styles.typeButtonsContainer}>

                {/* Botão "único" */}
                <button
                    className={`${styles.typeButton} ${styles.extraTypeButton} ${showUnique ? styles.extraVisible : ''} ${selectedType2 === 'None' ? styles.typeButtonActive : ''}`}
                    onClick={() => selectedType ? onTypeClick('None') : undefined}
                    title={selectedType2 === 'None'
                        ? `${selectedType} / None (clique para remover)`
                        : `${selectedType} / None (mostrar apenas tipo primário)`}
                    disabled={!showUnique}
                    aria-hidden={!showUnique}
                >
                    <span className={styles.circle} style={uniqueCircleStyle}>
                        <img src={`/assets/flags/uniqueButton.svg`} alt="unique" width={24} height={24} />
                    </span>
                </button>

                {/* 18 botões de tipo */}
                {TYPES.map(t => (
                    <button
                        key={t}
                        className={getButtonClass(t)}
                        onClick={() => onTypeClick(t)}
                        title={getTitle(t)}
                        disabled={bothSelected && selectedType !== t && selectedType2 !== t}
                    >
                        <span className={styles.circle} style={getCircleStyle(t)}>
                            <img src={`/assets/types/.svg/${t} Type Icon.svg`} alt={t} width={24} height={24} />
                        </span>
                    </button>
                ))}

                {/* Botão limpar */}
                <button
                    className={`${styles.typeButton} ${styles.clearTypeButton} ${showClear ? styles.extraVisible : ''}`}
                    onClick={onClear}
                    title="Limpar filtros de tipo"
                    disabled={!showClear}
                    aria-hidden={!showClear}
                >
                    <span className={styles.circle}>
                        <img src={`/assets/flags/trashcan_flag.svg`} alt="clear" width={24} height={24} />
                    </span>
                </button>

            </div>
        </div>
    )
}