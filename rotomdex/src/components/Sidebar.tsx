'use client'

import { useEffect, useState } from 'react'              // useState: Aramzena e Controla estados (Abrir/Fechar Sidebar)
import Link from 'next/link'                  // Link: Navegação entre páginas sem recarregar o site
import { usePathname } from 'next/navigation' // usePathname: Obtém a URL do site
import Image from 'next/image'                // styles: Otimiza imagens automaticamente
import styles from './Sidebar.module.css'     // Estilos CSS da Sidebar

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false) // Define se o menu está aberto ou fechado
    const pathname = usePathname() // Obtém pathname atual da URL

    const toggle = () => setIsOpen(prev => !prev) // Alternar estado; prev = valor anterior
    
    useEffect(() => { setIsOpen(false) }, [pathname]) // Fecha a sidebar automaticamente ao trocar de URL
    
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
                <Link href="/pokemon" className={styles.navlink}>Pokedex</Link>
                <Link href="/moves" className={styles.navlink}>Moves</Link>
                <Link href="/abilities" className={styles.navlink}>Abilities</Link>
                {/* Adicione mais links aqui */}
            </nav>
        </>
    )
}