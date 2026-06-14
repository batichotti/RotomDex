import Image from 'next/image'
import nav from './Navbar.module.css'
import Sidebar from './Sidebar'
import Link from 'next/link'

export default function Navbar(){
    return(
        <header className={nav.navbar}>
            <Sidebar/>
            <Link href={"/"}>
                <Image
                    src="/logos/.svg/RotomDex_logo_colored_wl.svg"
                    alt="Logo"
                    width={400}
                    height={400}
                    className={nav.logoImg}
                    loading="eager"
                    />
            </Link>
            <span className={nav.logo}></span>
        </header>
    )
}