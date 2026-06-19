import type { Pokemon } from '@/types/pokemon'

const variantComparisonKeys = [
  'primary_type',
  'secondary_type',
  'hp',
  'attack',
  'defense',
  'special_attack',
  'special_defense',
  'speed'
] as const;

export function getForm(name: string, speciesName: string): string | null {
  if (name === speciesName) return null;
  if (!name.startsWith(speciesName + '-')) return null;
  return name.slice(speciesName.length + 1).replaceAll('-', '_');
}

export function shouldShow(p: Pokemon, base: Pokemon | undefined, filter: string): boolean {
  if (p.id === p.species_id) return true;

  const form = getForm(p.name, p.species_name);
  if (filter === 'formSwitch' && form) return false;
  if (form?.includes('gmax')) return true;
  if (form?.includes('totem') || form?.includes('cap')) return false;
  if (!base) return filter !== 'false';
  return variantComparisonKeys.some((key) => p[key] !== base[key]);
}