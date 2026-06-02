'use client'

import styles from './PokemonFilters.module.css'

const TYPES = ['bug','dark','dragon','electric','fairy','fighting','fire','flying','ghost','grass','ground','ice','normal','poison','psychic','rock','steel','water']

interface TypeButtonGroupProps {
    selectedType: string
    selectedType2: string
    onTypeChange: (value: string) => void
    onType2Change: (value: string) => void
}

export default function TypeButtonGroup({ selectedType, selectedType2, onTypeChange, onType2Change }: TypeButtonGroupProps) {
    const hasType1 = !!selectedType

    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Botões de tipo primário */}
            <div className={styles.typeButtonsContainer}>
                {TYPES.map(t => (
                    <button
                        key={t}
                        className={`${styles.typeButton} ${selectedType === t ? styles.typeButtonActive : selectedType ? styles.typeButtonInactive : ''}`}
                        onClick={() => onTypeChange(selectedType === t ? '' : t)}
                        title={t}
                    >
                        <img src={`/assets/types/.svg/${t} Type Icon.svg`} alt={t} width={32} height={32} />
                    </button>
                ))}
            </div>

            {/* Select de tipo secundário */}
            <select
                className={styles.select}
                value={selectedType2}
                onChange={e => onType2Change(e.target.value)}
                disabled={!hasType1}
                title={!hasType1 ? 'Selecione o Tipo primário primeiro' : ''}
                style={{ opacity: hasType1 ? 1 : 0.4, cursor: hasType1 ? 'pointer' : 'not-allowed' }}
            >
                <option value=''>Tipo secundário</option>
                {TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                ))}
            </select>
        </div>
    )
}