'use client'

// Importa useRouter - Permite a navegaçõa entre páginas e useSearchParams - Permite ler parâmetros da URL
import { useRouter, useSearchParams } from 'next/navigation'

// Vetor de tipos
const TYPES = ['bug','dark','dragon','electric','fairy','fighting','fire','flying','ghost','grass','ground','ice','normal','poison','psychic','rock','steel','water']
// Vetor de ordenações
const ORDER_BY = ['id','name','attack','bst','defense','hp','special_attack','special_defense','speed','height','weight']

// Função para filtragem de Pokémon
export default function PokemonFilters(){
    const router = useRouter();       // Inicializa o Router
    const params = useSearchParams(); // Obtém os parâmetros da URL

    function handleChange(key: string, value: string){
        const current = new URLSearchParams(params.toString()); // Cópia dos parâmetros atuais
       
        if(value) current.set(key, value); // Se haver valor, atualiza a URL
        else current.delete(key); // Se vazio, remove o filtro

        // Se houver tipo 2, mas não tipo 1, bloqueia
        if(key === 'type2' && value && !current.get('type')) return;

        // Se type1 for removido, remove type2 também
        if(key === 'type' && !value) current.delete('type2');

        router.push(`/?${current.toString()}`) // Atualiza a página com a nova URL
    }

    const hasType1 = !!params.get('type'); // Verifica se tipo primário está selecionado

    // HTML
    return(
        // Filtros: gap entre elementos, flexwrap quebra linhas e adiciona margem abaixo
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>

            {/*Recebe valor de Tipo da URL e em mudanças chama handleChange*/}
            <select value={params.get('type') ?? ''} onChange={e => handleChange('type', e.target.value)}>
                <option value=''>Tipo</option>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            {/*Recebe valor de Tipo Secundário da URL e em mudanças chama handleChange*/}
            <select
                value={params.get('type2') ?? ''}
                onChange={e => handleChange('type2', e.target.value)}
                disabled={!hasType1}
                title={!hasType1 ? 'Selecione o Tipo primário primeiro' : ''}
                style={{ opacity: hasType1 ? 1 : 0.4, cursor: hasType1 ? 'pointer' : 'not-allowed' }}
            >
                <option value=''>Tipo secundário</option>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            {/*Define qual o campo de Ordenação; Padrão: 'id'*/}
            <select value={params.get('orderBy') ?? 'id'} onChange={e => handleChange('orderBy', e.target.value)}>
                {ORDER_BY.map(o => <option key={o} value={o}>{o}</option>)}
            </select>

            {/*Define se a ordenação é Crescente ou Descrescente'*/}
            <select value={params.get('order') ?? 'ASC'} onChange={e => handleChange('order', e.target.value)}>
                <option value='ASC'>ASC</option>
                <option value='DESC'>DESC</option>
            </select>

        </div>
    )
}