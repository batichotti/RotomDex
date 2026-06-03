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

    function getButtonStyle(t: string) {
        const isSelected = selectedType === t || selectedType2 === t
        if (isSelected) {
            return {
                backgroundColor: TYPE_COLORS[t as keyof typeof TYPE_COLORS],
            }
        }
        return {}
    }

    const hasSelection = !!selectedType || !!selectedType2

    return (
    <div className={`${styles.typeButtonsWrapper} ${hasSelection ? styles.typeButtonsWrapperActive : ''}`}>
        <div className={styles.typeButtonsContainer}>
            {TYPES.map(t => (
                <button
                    key={t}
                    className={getButtonClass(t)}
                    style={getButtonStyle(t)}
                    onClick={() => onTypeClick(t)}
                    title={getTitle(t)}
                    disabled={bothSelected && selectedType !== t && selectedType2 !== t}
                >
                    <img src={`/assets/types/.svg/${t} Type Icon.svg`} alt={t} width={32} height={32} />
                </button>
                ))}
        </div>
        
        <button
            className={`${styles.clearButton} ${hasSelection ? styles.clearButtonVisible : ''}`}
            onClick={onClear}
            title="Limpar filtros de tipo"
        >
            <img src={`/assets/flags/trashcan_flag.svg`} alt={"clear"} width={32} height={32} />
        </button>
    </div>
    )
}