"use client";
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_VEHICLE } from '../../Services/mutation';
import styles from './vehicle.module.css';
import Image from 'next/image';
import { Vehicle, VehicleDetailsProps } from '@/Utils/Models/Vehicle';
import Search from '@/Modules/User/Components/Search/searchLocation';
import back from '@/Themes/Images/navigate-back-circle-svgrepo-com.svg'
import { useRouter } from 'next/navigation';


const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicleId }) => {
  const { loading, error, data } = useQuery<{ getVehicle: Vehicle }>(GET_VEHICLE, {
    variables: { id: vehicleId },
  });
  const router = useRouter();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % (data?.getVehicle?.otherimages.length || 1);
        return newIndex;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [data?.getVehicle?.otherimages.length]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const vehicle = data?.getVehicle;

  if (!vehicle) {
    return <p>No vehicle found.</p>;
  }

  const handleNavigate = () => {
    router.push('/cars')
  }

  return (
    <div>
      <button onClick={() => handleNavigate()} className={styles.back}>
        <Image src={back} alt='back' height={30} width={30} />
      </button>
      <div className={styles.container}>

        <div className={styles.details}>
          <div className={styles.slideshow}>
            <h3>Other Images</h3>
            {vehicle.otherimages.length > 0 ? (
              <Image
                src={vehicle.otherimages[currentImageIndex]}
                alt={`Other image ${currentImageIndex + 1}`}
                width={400}
                height={300}
              />
            ) : (
              <p>No other images available.</p>
            )}
          </div>
          <div className={styles.info}>
            <h2>{vehicle.name}</h2>
            <p>{vehicle.description}</p>
            <div className={styles.features}>
              <p>Price: &#8377; {vehicle.price}/day</p>
              <p>Transmission: {vehicle.transmission}</p>
              <p>Fuel Type: {vehicle.fueltype}</p>
            </div>

          </div>
        </div>

        <Search vehicle={vehicle} />

      </div>
    </div>
  );
};

export default VehicleDetails;
