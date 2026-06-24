'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { Pokemon } from '@/types/pokemon'
import styles from './PokemonNavigation.module.css'
import { Beiruti } from 'next/font/google'

const beiruti = Beiruti({
  subsets: ['arabic', 'latin'],
  weight: 'variable',
  display: 'swap',
});

interface PokemonNavigationProps {
  pokemon: Pokemon
  prevPokemon?: { id: number; name: string } | null
  nextPokemon?: { id: number; name: string } | null
  alternativeForms?: Pokemon[] | null
}

export default function PokemonNavigation({
  pokemon,
  prevPokemon,
  nextPokemon,
  alternativeForms,
}: PokemonNavigationProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const hasMultipleForms = (alternativeForms?.length ?? 0) > 1

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleSelectForm = (formName: string) => {
    setIsOpen(false)
    if (formName !== pokemon.name) router.push(`/pokemon/${formName}`)
  }

  return (
    <nav className={`${styles.navBar} ${beiruti.className}`}>
      <button
        className={styles.navBtn}
        onClick={() => prevPokemon && router.push(`/pokemon/${prevPokemon.name}`)}
        disabled={!prevPokemon}
        aria-label="Pokémon anterior"
      >
        <span className={styles.arrow}>←</span>
        <span className={styles.info}>
          <span className={styles.num}>#{String(prevPokemon?.id ?? 0).padStart(3, '0')}</span>
          <span className={styles.name}>{prevPokemon?.name.replaceAll('-', ' ') ?? '—'}</span>
        </span>
      </button>

      <div className={styles.pokemonInfo}>
        <span className={styles.speciesNum}>#{pokemon.species_id}</span>

        {hasMultipleForms ? (
          <div className={styles.formsDropdown} ref={dropdownRef}>
            <button
              type="button"
              className={styles.formsTrigger}
              onClick={() => setIsOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
            >
              <b>{pokemon.name.replaceAll('-', ' ')}</b>
              <span className={styles.formsCaret} aria-hidden="true">
                {isOpen ? '▲' : '▼'}
              </span>
            </button>

            {isOpen && (
              <ul className={styles.formsList} role="listbox">
                {alternativeForms!.map((form) => (
                  <li key={form.id} role="option" aria-selected={form.name === pokemon.name}>
                    <button
                      type="button"
                      className={`${styles.formsItem} ${form.name === pokemon.name ? styles.formsItemActive : ''
                        }`}
                      onClick={() => handleSelectForm(form.name)}
                    >
                      {form.name.replaceAll('-', ' ')}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <b>{pokemon.name.replaceAll('-', ' ')}</b>
        )}
      </div>

      <button
        className={styles.navBtn}
        onClick={() => nextPokemon && router.push(`/pokemon/${nextPokemon.name}`)}
        disabled={!nextPokemon}
        aria-label="Próximo Pokémon"
      >
        <span className={`${styles.info} ${styles.infoRight}`}>
          <span className={styles.num}>#{String(nextPokemon?.id ?? 0).padStart(3, '0')}</span>
          <span className={styles.name}>{nextPokemon?.name.replaceAll('-', ' ') ?? '—'}</span>
        </span>
        <span className={styles.arrow}>→</span>
      </button>
    </nav>
  )
}