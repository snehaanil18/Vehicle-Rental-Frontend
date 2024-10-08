import Link from 'next/link'
import styles from './footer.module.css'
import fb from '../../Images/facebook-176-svgrepo-com.svg'
import Image from 'next/image'
import ig from '../../Images/instagram-167-svgrepo-com.svg'
import tw from '../../Images/twitter-svgrepo-com.svg'


export default function Footer(){
    return(
        <div className={styles.footerContainer}>
            <div className="container">
               
                <div className={styles.information}>
                <div className={styles.about}>
                <Link href={'/'}>
                        Swift Cars
                    </Link>
                </div>
                    <div className={styles.aboutUs}>
                        <h3>ABOUT US</h3>
                        <p>Swift Cars is a joint venture of 10 leading travel operators in Kerala with a highly reputed service experience. We have a long and highly respected relationship with the travel industry.</p>
                    </div>
                    <div className={styles.tabs}>
                        <h3>INFORMATION</h3>
                        <Link href={'/'}>About</Link>
                        <Link href={'/'}>Terms & Conditions</Link>
                        <Link href={'/'}>Contact</Link>
                    </div>
                    <div className={styles.links}>
                        <a href="https://www.facebook.com" target='blank'>
                            <Image src={fb} alt='facebook' height={20} width={20}/>
                        </a>
                        <a href="https://www.instagram.com/">
                            <Image src={ig} alt='instagram' height={20} width={20}/>
                        </a>
                        <a href="https://x.com/?lang=en&mx=2">
                            <Image src={tw} alt='twitter' height={20} width={20}/>
                        </a>
                    </div>
                </div>
                <hr />
                <div className={styles.copyright}>Copyright &copy; 2024 Swift Cars. All rights reserved.</div>
            </div>
        </div>
    )
}