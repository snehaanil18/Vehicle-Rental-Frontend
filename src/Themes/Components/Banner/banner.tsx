// import Link from 'next/link'
// import styles from './banner.module.css'
// import Button from '@/Utils/Components/Button/Button'

// import Image from 'next/image'


// export default function Banner() {
//     return (
//         <div className={styles.main}>
//             <div className={styles.banner}>
//                 <div className={styles.container}>
//                     <h1>Self Drive Car Rental</h1>
//                     <div>Choose Your Favourate Car & Enjoy Your Ride</div>
//                     <Link href={'/cars'}>
//                         <Button label='Explore' />
//                     </Link>
//                 </div>
//                 <div className="bannerImg">
//                     <Image src={banner} alt='car-banner' height={400} width={480}/>
//                 </div>
//                 {/* <div className="bannerImg">
//                 <Image src={banner} alt='car-banner' height={280} width={400}/>
//             </div> */}
//             </div>
//         </div>

//     )
// }

// src/app/page.tsx
"use client";
import Image from 'next/image';
import { useState } from 'react';
import banner from '@/Themes/Images/opera-blue-left-43.webp'
import styles from './banner.module.css'
import Link from 'next/link'

export default function LandingPage() {
    const [hovered, setHovered] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Self Drive Car Rental</h1>
                    <p className={styles.subtitle}>
                        Choose Your Favourite Car & Enjoy Your Ride
                    </p>
                    <Link href={'/cars'}>
                        <button
                            className={`${styles.exploreButton} ${hovered ? styles.hovered : ''}`}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            Explore
                        </button>
                    </Link>
                </div>
                <div className={styles.imageContainer}>
                    <Image
                        src={banner}
                        alt="Car"
                        width={500}
                        height={300}
                        className={styles.carImage}
                    />
                </div>
            </div>
        </div>
    );
}
