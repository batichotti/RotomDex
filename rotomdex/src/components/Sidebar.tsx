'use client'

import { useState } from 'react'          // useState: Aramzena e Controla estados (Abrir/Fechar Sidebar)
import Link from 'next/link'              // Link: Navegação entre páginas sem recarregar o site
import Image from 'next/image'            // styles: Otimiza imagens automaticamente
import styles from './Sidebar.module.css' // Estilos CSS da Sidebar

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false) // Define se o menu está aberto ou fechado

    const toggle = () => setIsOpen(prev => !prev) // Alternar estado; prev = valor anterior

    // HTML
    return (
        // Retorna múltiplos elementos usando fragment
        <>
            {/*Botão de Abrir/Fechar Menu*/}
            <button
                className={`${styles.menuBtn} ${isOpen ? styles.open : ''}`}
                onClick={toggle}
                aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            >
                {/*Imagem dentro do botão*/}
                <Image
                src="/logos/.svg/RotomDex_mini_colored.svg"
                alt="Menu"
                width={90}
                height={53}
                style={{
                    width: "100%",       // Ocupa o botão inteiro
                    height: "100%",      // Respeita a altura do botão
                    objectFit: "contain" // Escala sem cortar, mantém proporção
                    }}
                />                  
            </button>

            {/*Se estiver aberto, ativa o Style Overlay*/}
            {isOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/*Container da Sidebar*/}
            <nav className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <Link href="/" className={styles.navlink}>Home</Link>
                <Link href="/pokedex" className={styles.navlink}>Pokedex</Link>
                {/* Adicione mais links aqui */}
            </nav>
        </>
    )
}