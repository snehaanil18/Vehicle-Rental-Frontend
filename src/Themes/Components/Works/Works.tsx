// components/WorkProcess.tsx
import styles from './works.module.css'
import Image from 'next/image';
import img1 from '@/Themes/Images/aeroplane-plane-svgrepo-com.svg'
import calender from '@/Themes/Images/calender-svgrepo-com.svg'
import car from '@/Themes/Images/car-svgrepo-com.svg'
import img4 from '@/Themes/Images/smiley-good-svgrepo-com.svg'

const WorkProcess = () => {
  return (
    <div className={styles.workProcess}>
      <h2 className={styles.title}>WORK PROCESS</h2>
      <h3 className={styles.subtitle}>HOW IT WORKS?</h3>
      <p className={styles.companyInfo}>
      Swift Cars is a division of Trust Pilot Trans & Trades PVT LTD. We have a fleet of top quality vehicles ranging from hatchbacks to premium sedans.
      </p>
      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.icons}>
            <Image src={img1} alt="Pick Destination" width={50} height={50} />
          </div>
          <h4>1. PICK DESTINATION</h4>
          <p>Choose your pickup date and drop off location.</p>
        </div>
        <div className={styles.step}>
          <div className={styles.icons}>
            <Image src={calender} alt="Select Term" width={50} height={50} />
          </div>
          <h4>2. SELECT TERM</h4>
          <p>Get clear details of your rental car, well documented.</p>
        </div>
        <div className={styles.step}>
          <div className={styles.icons}>
            <Image src={car} alt="Choose a Car" width={50} height={50} />
          </div>
          <h4>3. CHOOSE A CAR</h4>
          <p>We have all types of cars ranging from Tata Nano to Mercedes Benz.</p>
        </div>
        <div className={styles.step}>
          <div className={styles.icons}>
            <Image src={img4} alt="Enjoy the Ride" width={50} height={50} />
          </div>
          <h4>4. ENJOY THE RIDE</h4>
          <p>All our Services are highly Professional.</p>
        </div>
      </div>
    </div>
  );
};

export default WorkProcess;
