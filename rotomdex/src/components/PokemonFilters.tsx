'use client'

// Importa useRouter - Permite a navegaçõa entre abas do usuário e useSearchParams - Permite o acesso a filtragens da query
import { useRouter, useSearchParams } from 'next/navigation'

// Vetor de tipos
const TYPES = ['bug','dark','dragon','electric','fairy','fighting','fire','flying','ghost','grass','ground','ice','normal','poison','psychic','rock','steel','water']
// Vetor de ordenações
const ORDER_BY = ['id','name','attack','bst','defense','hp','special_attack','special_defense','speed','height','weight']

// Função para filtragem de Pokémon
export default function PokemonFilters(){
    const router = useRouter();
    const params = useSearchParams();

    function handleChange(key: string, value: string){
       const current = new URLSearchParams(params.toString());
       
       if(value) current.set(key, value);
        else current.delete(key);

        router.push(`/?${current.toString()}`)
    }

    return(
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>

            <select value={params.get('type') ?? ''} onChange={e => handleChange('type', e.target.value)}>
                <option value=''>Tipo primário</option>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <select value={params.get('type2') ?? ''} onChange={e => handleChange('type2', e.target.value)}>
                <option value=''>Tipo secundário</option>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <select value={params.get('orderBy') ?? 'id'} onChange={e => handleChange('orderBy', e.target.value)}>
                {ORDER_BY.map(o => <option key={o} value={o}>{o}</option>)}
            </select>

            <select value={params.get('order') ?? 'ASC'} onChange={e => handleChange('order', e.target.value)}>
                <option value='ASC'>ASC</option>
                <option value='DESC'>DESC</option>
            </select>

        </div>
    )
}