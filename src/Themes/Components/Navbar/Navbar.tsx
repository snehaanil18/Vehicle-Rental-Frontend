import Link from 'next/link'
import styles from './navbar.module.css'

export default function Navbar() {
    return (
        <div>
            
            <div className={styles.navbarContainer}>
                <div className={styles.logo}>
                    <Link href={'/'}>
                        Swift Cars
                    </Link>
                </div>
                <div className={styles.elements}>
                    <ul>
                        <li>
                            <Link href={'/'}>
                                HOME
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                ABOUT
                            </Link>
                        </li>
                        <li>
                            <Link href={'/cars'}>
                                CARS
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                CONTACT
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}