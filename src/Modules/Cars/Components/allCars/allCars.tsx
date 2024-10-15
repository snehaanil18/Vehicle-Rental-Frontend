"use client";
import React, { useState } from 'react'
import { Vehicle } from '@/Utils/Models/Vehicle';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_ALL_VEHICLES, SEARCH_VEHICLES } from '../../Services/mutation'
import styles from './allCars.module.css'
import Image from 'next/image';
import car from '@/Themes/Images/car-svgrepo-com (1).svg'
import icon from '@/Themes/Images/snow-alt-svgrepo-com (1).svg'
import seat from '@/Themes/Images/seat-svgrepo-com.svg'
import Button from '@/Utils/Components/Button/Button';
import InputField from '@/Utils/Components/InputField/InputField';
import { useRouter } from 'next/navigation'; 


function AllCars() {
    const router = useRouter();
    const vehicleTypes = ['All', 'SUV', 'Sedan', 'Truck', 'Coupe', 'Hatchback', 'Convertible', 'Wagon'];
    const { loading, error, data } = useQuery<{ getAllVehicles: Vehicle[] }>(GET_ALL_VEHICLES);
    const [selectedType, setSelectedType] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Vehicle[]>([]);

    const [searchVehicles, { loading: searchLoading, error: searchError }] = useLazyQuery(SEARCH_VEHICLES, {
        onCompleted: (data) => {
            setSearchResults(data.searchVehicles);
        },
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.length > 2) {
            searchVehicles({ variables: { query: value } });
        } else {
            setSearchResults([]);
        }
    };


    let filteredVehicles: Vehicle[] | undefined;

    if (searchResults.length > 0) {
        filteredVehicles = searchResults;
    } else if (selectedType === 'All') {
        filteredVehicles = data?.getAllVehicles;
    } else {
        filteredVehicles = data?.getAllVehicles?.filter(vehicle => vehicle.vehicletype.toLowerCase() === selectedType.toLowerCase());
    }

    if (loading || searchLoading) return <p>Loading...</p>;
    if (error || searchError) return <p>Error: {error?.message || searchError?.message}</p>;

    return (
        <div>
            {/* Search Input */}
            <div className={styles.searchContainer}>
                <InputField
                    type="text"
                    name='search'
                    placeholder="Search Cars"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

           
            {!searchTerm && (
                <div className={styles.tabs}>
                    {vehicleTypes.map(type => (
                        <button
                            key={type}
                            className={`${styles.tab} ${selectedType === type ? styles.activeTab : ''}`}
                            onClick={() => setSelectedType(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            )}


            
            {filteredVehicles && (
                <div className={styles.container}>
                    <div className={styles.cardContainer}>
                        {filteredVehicles.map((vehicle: Vehicle) => (
                            <div key={vehicle.id} className={styles.card}>
                                <Image src={vehicle.primaryimage} alt={vehicle.name} height={200} width={300}  />

                                <h3 className={styles.cardTitle}>{vehicle.name}</h3>

                                <div className={styles.features}>
                                    <div className={styles.type}>
                                        <div><Image src={car} alt="fuel" width={30} height={30} /></div>
                                        <div>{vehicle.fueltype}</div>
                                    </div>
                                    <div className={styles.type}>
                                        <div><Image src={icon} alt="type" width={30} height={30} /></div>
                                        <div>{vehicle.transmission}</div>
                                    </div>
                                    <div className={styles.type}>
                                        <div><Image src={seat} alt="seats" width={30} height={30} /></div>
                                        <div>5 seater</div>
                                    </div>
                                </div>
                                <hr />
                                <div className={styles.price}>
                                    <div>Price</div>
                                    <div className={styles.amount}>&#8377; {vehicle.price}/day</div>
                                </div>

                                <div className={styles.rent}>
                                    <Button label="Rent Now &rarr;" onClick={() => router.push(`/car/${vehicle.id}`)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

    )
}

export default AllCars