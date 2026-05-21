'use client'

// Importa useRouter - Permite a navegaçõa entre páginas e useSearchParams - Permite ler parâmetros da URL
import { useRouter, useSearchParams } from 'next/navigation'

// Vetor de tipos
const TYPES = ['bug','dark','dragon','electric','fairy','fighting','fire','flying','ghost','grass','ground','ice','normal','poison','psychic','rock','steel','water']
// Vetor de Classes
const DAMAGE_CLASS = ['physical', 'special', 'status']
// Vetor de ordenações
const ORDER_BY = ['id', 'name', 'power', 'type', 'pp', 'effect_chance', 'damage_class', 'category']

// Função para filtragem de Tipos
export default function MovesFilters() {
    const router = useRouter();       // Inicializa o Router
    const params = useSearchParams(); // Obtém os parâmetros da URL

    function handleChange(key: string, value: string) {
        const current = new URLSearchParams(params.toString())

        if(value) current.set(key, value); // Se haver valor, atualiza a URL
        else current.delete(key); // Se vazio, remove o filtro

        router.push(`/moves?${current.toString()}`) // Atualiza a página com a nova URL
    }

    // HTML
    return (
        // Filtros: gap entre elementos, flexwrap quebra linhas e adiciona margem abaixo
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>

            {/*Tipo*/}
            <select value={params.get('type') ?? ''} onChange={e => handleChange('type', e.target.value)}>
                <option value=''>Tipo</option>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            {/* Classe */}
            <select value={params.get('damage_class') ?? ''} onChange={e => handleChange('damage_class', e.target.value)}>
                <option value=''>Classe</option>
                {DAMAGE_CLASS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            {/* {/* Power mínimo
            <input
                type='number'
                placeholder='Power mín.'
                min={0} max={250}
                value={params.get('min') ?? ''}
                onChange={e => {
                    handleChange('fill', 'power')
                    handleChange('min', e.target.value)
                }}
                style={{ width: '90px' }}
            /> */}

            {/* {/* Power máximo
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
            /> */}

            {/* Power */}
            <input
                type='number'
                placeholder='Power'
                min={0} max={250}
                value={params.get('power') ?? ''}
                onChange={e => handleChange('power', e.target.value)}
                style={{ width: '85px' }}
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