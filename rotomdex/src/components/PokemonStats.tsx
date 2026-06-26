import type { Pokemon } from '@/types/pokemon'

const COLOR_THRESHOLDS = [
  { max: 20,  max_bst: 300, color: '#cb1a0e' }, // dark red
  { max: 30,  max_bst: 400, color: '#f2190a' }, // red
  { max: 60,  max_bst: 500, color: '#ef8310' }, // orange
  { max: 90,  max_bst: 550, color: '#ffb300' }, // amber
  { max: 120, max_bst: 650, color: '#41d848' }, // green
  { max: 150, max_bst: 700, color: '#5a800f' }, // olive
  { max: 255, max_bst: 770, color: '#00c2b8' }, // cyan
] as const;

const PINK = '#f01dd1';

function barColor(value: number, bst = false): string {
  return COLOR_THRESHOLDS.find(({ max, max_bst }) => value < (bst ? max_bst : max))?.color ?? PINK;
}

export default function PokemonStats({ pokemon }: { pokemon: Pokemon }) {
  const stats = [
    ['HP', pokemon.hp],
    ['Attack', pokemon.attack],
    ['Defense', pokemon.defense],
    ['Special Attack', pokemon.special_attack],
    ['Special Defense', pokemon.special_defense],
    ['Speed', pokemon.speed],
    ['BST', pokemon.bst]
  ] as const

  return(
    <div>
      {stats.map(([label, value]) => {
        const color = (label === 'BST') ? barColor(value, true) : barColor(value);
        return (
          <div key={label} style={{ marginBottom: 8 }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
              <span>{label}</span>
              <span>{value}</span>
            </div>
            <div style={{ width: '100%', height: 10, background: '#c9c8c8', borderRadius: 6, overflow: 'hidden' }}>
              <div
                style={{
                  width: (label === 'BST') ? `${value*100/(255*6)}%` : `${value*100/255}%`,
                  height: '100%',
                  background: color,
                  transition: 'width 300ms ease'
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
