'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Sidebar.module.css'
import Image from 'next/image'

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(prev => !prev)

    return (
        <>
            <button
                className={`${styles.menuBtn} ${isOpen ? styles.open : ''}`}
                onClick={toggle}
                aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            >
                <Image
                    src="/logos/.svg/RotomDex_mini_colored.svg"
                    alt="Menu"
                    width={90}
                    height={53}
                />
            </button>

            {isOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setIsOpen(false)}
                />
            )}

            <nav className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <Link href="/" className={styles.navlink}>Home</Link>
                <Link href="/" className={styles.navlink}>Pokedex</Link>
                {/* Adicione mais links aqui */}
            </nav>
        </>
    )
}