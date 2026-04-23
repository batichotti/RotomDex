'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Sidebar.module.css'

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button onClick={() => setIsOpen(true)}>☰</button>

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