'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const CATEGORIES = [
    'standard-balls', 'special-balls', 'healing', 'status-cures', 'revival', 
    'vitamins', 'pp-recovery', 'stat-boosts', 'spelunking', 'flutes', 'collectibles', 
    'evolution', 'loot', 'mulch', 'dex-completion', 'species-specific', 'all-mail', 'medicine'
]
const ORDER_BY = ['name', 'cost', 'fling_power']
const ORDER_DIRECTIONS = ['ASC', 'DESC']

export default function ItemsFilters() {
    const router = useRouter();
    const params = useSearchParams();

    // 1. Estado local APENAS para os campos de digitação (para não perder o foco do teclado)
    const [inputs, setInputs] = useState({
        description: params.get('description') ?? '',
        cost_min: params.get('cost_min') ?? '',
        cost_max: params.get('cost_max') ?? '',
        cost: params.get('cost') ?? '',
        fling_power: params.get('fling_power') ?? '',
    });

    // 2. Atualiza a URL IMEDIATAMENTE quando interagimos com os <select>
    function handleSelectChange(key: string, value: string) {
        const current = new URLSearchParams(params.toString());
        if (value) current.set(key, value);
        else current.delete(key);
        
        router.push(`/items?${current.toString()}`);
    }

    // 3. Salva os valores digitados nos <input> apenas no estado local por enquanto
    function handleInputChange(key: string, value: string) {
        setInputs(prev => ({ ...prev, [key]: value }));
    }

    // 4. Efeito Debounce: Aguarda 500ms sem digitar e envia todos os textos/números para a URL de uma vez
    useEffect(() => {
        const timer = setTimeout(() => {
            const current = new URLSearchParams(params.toString());
            let hasChanges = false;

            Object.entries(inputs).forEach(([key, value]) => {
                const urlValue = current.get(key) ?? '';
                
                // Só modifica a URL se o valor realmente mudou
                if (value !== urlValue) {
                    if (value) current.set(key, value);
                    else current.delete(key);
                    hasChanges = true;
                }
            });

            if (hasChanges) {
                router.push(`/items?${current.toString()}`);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [inputs, params, router]);

    return (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>

            {/* Categoria (Select - Atualiza Imediato) */}
            <select 
                value={params.get('category') ?? ''} 
                onChange={e => handleSelectChange('category', e.target.value)}
            >
                <option value=''>category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Descrição (Input - Atualiza com Debounce) */}
            <input
                type='text'
                placeholder='description'
                value={inputs.description}
                onChange={e => handleInputChange('description', e.target.value)}
                style={{ width: '150px' }}
            />

            {/* Cost Mínimo */}
            <input
                type='number'
                placeholder='Cost Min.'
                min={0}
                value={inputs.cost_min}
                onChange={e => handleInputChange('cost_min', e.target.value)}
                style={{ width: '100px' }}
            />

            {/* Cost Máximo */}
            <input
                type='number'
                placeholder='Cost Max.'
                min={0}
                value={inputs.cost_max}
                onChange={e => handleInputChange('cost_max', e.target.value)}
                style={{ width: '100px' }}
            />

            {/* Cost Exato */}
            <input
                type='number'
                placeholder='Cost'
                min={0}
                value={inputs.cost}
                onChange={e => handleInputChange('cost', e.target.value)}
                style={{ width: '100px' }}
            />

            {/* Fling Power */}
            <input
                type='number'
                placeholder='Fling Power'
                min={0}
                value={inputs.fling_power}
                onChange={e => handleInputChange('fling_power', e.target.value)}
                style={{ width: '110px' }}
            />

            {/* Ordenação (Select - Atualiza Imediato) */}
            <select value={params.get('orderBy') ?? 'name'} onChange={e => handleSelectChange('orderBy', e.target.value)}>
                {ORDER_BY.map(o => <option key={o} value={o}>{o}</option>)}
            </select>

            {/* Direção (Select - Atualiza Imediato) */}
            <select value={params.get('order') ?? 'ASC'} onChange={e => handleSelectChange('order', e.target.value)}>
                <option value='ASC'>ASC</option>
                <option value='DESC'>DESC</option>
            </select>

        </div>
    )
}