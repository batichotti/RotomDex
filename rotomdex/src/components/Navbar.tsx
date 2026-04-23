import Image from 'next/image'  // <- faltou isso
import styles from './Navbar.module.css'
import Sidebar from './Sidebar'

export default function Navbar(){
    return(
        <header className={styles.navbar}>
            <Sidebar/>
            <Image
                src="/logos/.png/RotomDex_logo_colored_wl.png"
                alt="Logo"
                width={400}
                height={400}
                className={styles.logoImg}
                priority
            />
            <span className={styles.logo}></span>
        </header>
        
    )
}