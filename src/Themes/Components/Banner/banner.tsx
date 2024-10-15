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
