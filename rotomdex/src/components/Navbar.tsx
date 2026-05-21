import Image from 'next/image'
import nav from './Navbar.module.css'
import Sidebar from './Sidebar'

export default function Navbar(){
    return(
        <header className={nav.navbar}>
            <Sidebar/>
            <Image
                src="/logos/.svg/RotomDex_logo_colored_wl.svg"
                alt="Logo"
                width={400}
                height={400}
                className={nav.logoImg}
                loading="eager"
            />
            <span className={nav.logo}></span>
        </header>
    )
}