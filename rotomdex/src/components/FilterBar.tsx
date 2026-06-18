'use client'

import styles from './FilterBar.module.css' // Importar estilo da FilterBar
import { useState, useEffect, useRef } from 'react'

interface FilterBarProps {
  children: React.ReactNode;
  advanced?: React.ReactNode;
}

// Função FilterBar
export default function FilterBar({children, advanced}: FilterBarProps) {
  const [open, setOpen] = useState(false);
  
  const barRef = useRef<HTMLDivElement>(null) // Cria uma referência para o elemento <div className={styles.bar}>
  
  useEffect(() => {
    if (!barRef.current) return // Se o elemento ainda não existir, não faz nada

    const observer = new ResizeObserver(([entry]) => {
      const height = entry.contentRect.height           // Pega a altura atual do elemento
      document.documentElement.style.setProperty('--filterbar-height', `${height + 4}px`) 
    })

    observer.observe(barRef.current) // Começa a observar o elemento
    return () => observer.disconnect() // Quando o componente for destruído, para de observar
  }, []) // [] = roda só uma vez, quando o componente for montado

  // HTML
  return (
    <div className={styles.bar} ref={barRef}>
      <div className={styles.mainRow}>
        {children}        
      </div>

        {advanced && (
          <div className={styles.buttonRow}>
            <button className={styles.advancedBtn}
              onClick={() => setOpen(prev => !prev)}>
              Advanced Filters {open ? '▲' : '▼'}
            </button>
          </div>
        )}

        {advanced && (
          <div className={`${styles.advancedRow} ${open ? styles.advancedRowOpen : ''}`}>
            {advanced}
          </div>
        )}

    </div>
  )
}