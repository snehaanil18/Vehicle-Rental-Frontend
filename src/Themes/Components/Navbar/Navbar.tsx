"use client";
import Link from 'next/link'
import styles from './navbar.module.css'
import { useSelector } from 'react-redux'; // Import useSelector
import { RootState } from '@/Utils/Redux/store';
import { useState } from 'react';


export default function Navbar() {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Toggle menu state
    };

    return (
        <div className={styles.navbarContainer}>
        <div className={styles.logo}>
            <Link href={'/'}>
                Swift Cars
            </Link>
        </div>

        
        <button className={styles.menuIcon} onClick={() =>toggleMenu()}>
            &#9776;
        </button>

        <div className={`${styles.elements} ${menuOpen ? styles.active : ''}`}>
            <ul>
                <li>
                    <Link href={'/'}>HOME</Link>
                </li>
                <li>
                    <Link href={'/'}>ABOUT</Link>
                </li>
                <li>
                    <Link href={'/cars'}>CARS</Link>
                </li>
                <li>
                    <Link href={'/'}>CONTACT</Link>
                </li>
                {isLoggedIn ?
                    <li>
                        <Link href={'/profile'}>PROFILE</Link>
                    </li>
                    :
                    <li>
                        <Link href={'/login'}>LOGIN</Link>
                    </li>
                }
            </ul>
        </div>
    </div>
    )
}