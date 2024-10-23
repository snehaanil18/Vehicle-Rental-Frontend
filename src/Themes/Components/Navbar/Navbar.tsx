"use client";
import Link from 'next/link'
import styles from './navbar.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/Utils/Redux/store';
import { useEffect, useState } from 'react';
import { clearUser } from '@/Utils/Redux/Slices/userSlice';


export default function Navbar() {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const [menuOpen, setMenuOpen] = useState(false);
    const [log, setLog] = useState(false)
    const dispatch = useDispatch();



    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        // Remove the token from sessionStorage
        sessionStorage.removeItem('token');
        
        // Dispatch the clearUser action to reset user state
        dispatch(clearUser());
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setLog(true);
        } else {
            setLog(false);
        }
    }, [handleLogout]);

    return (
        <div className={styles.navbarContainer}>
            <div className={styles.logo}>
                <Link href={'/'}>
                    Swift Cars
                </Link>
            </div>


            <button className={styles.menuIcon} onClick={() => toggleMenu()}>
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
                    {isLoggedIn || log ?
                        <div className={styles.profile}>
                            <li>
                                <Link href={'/profile'}>PROFILE</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout}>
                                LOGOUT
                                </button>
                               
                            </li>
                        </div>


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