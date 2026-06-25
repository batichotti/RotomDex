'use client'

import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import styles from './EggGroupSelect.module.css'
import { EGG_GROUPS } from '@/utils/PokemonInfoMaps'

interface FillFiterProps {
    value: string
    onChange: (value: string) => void
}

export default function FillFilter({ value, onChange }: FillFiterProps) {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const toggleRef = useRef<HTMLButtonElement>(null)
    const [width, setWidth] = useState<number | undefined>(undefined)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Mede a largura necessária do conteúdo (fechado = só o botão, aberto = botão + opções)
    useLayoutEffect(() => {
        if (open && contentRef.current) {
            setWidth(contentRef.current.scrollWidth)
        } else if (!open && toggleRef.current) {
            setWidth(toggleRef.current.scrollWidth)
        }
    }, [open, value])

    function handleSelect(opt: string) {
        onChange(opt === value ? '' : opt)
        setOpen(false)
    }

    const selectedLabel = EGG_GROUPS.find(opt => opt.key === value)?.label ?? 'Egg Group'

    return (
        <div
            className={`${styles.eggGroupSelect} ${open ? styles.eggGroupSelectOpen : ''} ${value ? styles.eggGroupSelectActive : ''}`}
            ref={containerRef}
            style={width !== undefined ? { width } : undefined}
        >
            <div className={styles.eggGroupContent} ref={contentRef}>
                <button
                    type="button"
                    className={styles.eggGroupToggle}
                    onClick={() => setOpen(prev => !prev)}
                    ref={toggleRef}
                >
                    {selectedLabel} {open ? '◄' : '►'}
                </button>

                <div className={`${styles.eggGroupOptions} ${value ? styles.eggGroupOptionsHasSelection : ''}`}>
                    {EGG_GROUPS.map(opt => (
                        <button
                            key={opt.key}
                            type="button"
                            className={`${styles.eggGroupOption} ${opt.key === value ? styles.eggGroupOptionActive : ''}`}
                            onClick={() => handleSelect(opt.key)}
                            tabIndex={open ? 0 : -1}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}