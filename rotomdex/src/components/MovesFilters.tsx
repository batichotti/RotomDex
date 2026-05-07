'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const TYPES = ['bug','dark','dragon','electric','fairy','fighting','fire','flying','ghost','grass','ground','ice','normal','poison','psychic','rock','steel','water']
const DAMAGE_CLASS = ['physical', 'special', 'status']
const ORDER_BY = ['id', 'name', 'power', 'type', 'pp', 'effect_chance', 'damage_class', 'category']

export default function MovesFilters() {
    const router = useRouter()
    const params = useSearchParams()

    function handleChange(key: string, value: string) {
        const current = new URLSearchParams(params.toString())

        if (value) current.set(key, value)
        else current.delete(key)

        router.push(`/moves?${current.toString()}`)
    }

    return (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>

            {/* Tipo */}
            <select value={params.get('type') ?? ''} onChange={e => handleChange('type', e.target.value)}>
                <option value=''>Tipo</option>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            {/* Classe de Dano */}
            <select value={params.get('damage_class') ?? ''} onChange={e => handleChange('damage_class', e.target.value)}>
                <option value=''>Classe de dano</option>
                {DAMAGE_CLASS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            {/* Power mínimo */}
            <input
                type='number'
                placeholder='Power mín.'
                min={0} max={250}
                value={params.get('min') ?? ''}
                onChange={e => {
                    handleChange('fill', 'power')          // define que o range é sobre power
                    handleChange('min', e.target.value)
                }}
                style={{ width: '90px' }}
            />

            {/* Power máximo */}
            <input
                type='number'
                placeholder='Power máx.'
                min={0} max={250}
                value={params.get('max') ?? ''}
                onChange={e => {
                    handleChange('fill', 'power')
                    handleChange('max', e.target.value)
                }}
                style={{ width: '90px' }}
            />

            {/* PP */}
            <input
                type='number'
                placeholder='PP'
                min={0} max={64}
                value={params.get('pp') ?? ''}
                onChange={e => handleChange('pp', e.target.value)}
                style={{ width: '70px' }}
            />

            {/* Accuracy */}
            <input
                type='number'
                placeholder='Accuracy'
                min={0} max={100}
                value={params.get('accuracy') ?? ''}
                onChange={e => handleChange('accuracy', e.target.value)}
                style={{ width: '85px' }}
            />

            {/* Ordenação */}
            <select value={params.get('orderBy') ?? 'name'} onChange={e => handleChange('orderBy', e.target.value)}>
                {ORDER_BY.map(o => <option key={o} value={o}>{o}</option>)}
            </select>

            {/* Direção */}
            <select value={params.get('order') ?? 'ASC'} onChange={e => handleChange('order', e.target.value)}>
                <option value='ASC'>ASC</option>
                <option value='DESC'>DESC</option>
            </select>

        </div>
    )
}