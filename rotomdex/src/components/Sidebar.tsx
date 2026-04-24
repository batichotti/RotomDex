'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Sidebar.module.css'
import Image from 'next/image'

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button className={styles.menuBtn} onClick={() => setIsOpen(true)}>
                <Image
                    src="/logos/.png/RotomDex_mini_colored.png"
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
                <button
                    className={styles.closeBtn}
                    onClick={() => setIsOpen(false)}
                >
                    ✕
                </button>

                <Link href="/" className={styles.navLink}>Home</Link>
            </nav>
        </>
    )
}