import React from 'react'
import Button from '@/Utils/Components/Button/Button'
import styles from './brand.module.css'

function Brand() {
  return (
    <div className={styles.main}>
        <div className={styles.container}>
            <div className={styles.logo}>
                Swift Cars
            </div>
            
            <div className={styles.book}>Book on TranzCars Now!</div>
            <div className="button">
                <Button label='SEE ALL CARS &rarr;'/>
            </div>
        </div>
    </div>
  )
}

export default Brand