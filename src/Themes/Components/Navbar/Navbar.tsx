"use client";
import Link from 'next/link'
import styles from './navbar.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/Utils/Redux/store';
import { useEffect, useState } from 'react';
import { clearUser } from '@/Utils/Redux/Slices/userSlice';
import bell from '@/Themes/Images/notification-bell-on-svgrepo-com.svg'
import Image from 'next/image';
import { useSocket } from '@/Utils/Context/webSocketContext';


export default function Navbar() {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const [menuOpen, setMenuOpen] = useState(false);
    const [log, setLog] = useState(false);

    const [showNotifications, setShowNotifications] = useState(false);
    const dispatch = useDispatch();

    const { notifications } = useSocket();
    console.log(notifications, 'notify');


    const handleLogout = () => {
        sessionStorage.removeItem('token');
        dispatch(clearUser());
        setShowNotifications(false)
    }

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
            setLog(true);
        } else {
            setLog(false);
        }

    }, [isLoggedIn, dispatch]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <div>
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
                                <li className={styles.bellContainer}>
                                    <button onClick={toggleNotifications}>

                                        <Image src={bell} alt='notifications' height={24} width={24} />
                                        {notifications.length > 0 && ( 
                                            <span className={styles.notificationBadge}>
                                                {notifications.length}
                                            </span>
                                        )}
                                    </button>
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
            {
                showNotifications && (
                    <div className={styles.notification}>
                        <ul>
                            {notifications.length > 0 ? (
                                notifications.map((notification, index) => (
                                    <li key={index} className={styles.notificationItem}>
                                        {notification.message}
                                        <hr />
                                    </li>

                                ))
                            ) : (
                                <li>No notifications available.</li>
                            )}
                        </ul>
                    </div>
                )
            }
        </div>
    )
}