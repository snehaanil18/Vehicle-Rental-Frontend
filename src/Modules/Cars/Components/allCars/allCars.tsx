"use client";
import React, { useState } from 'react'
import { Vehicle } from '@/Utils/Models/Vehicle';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_ALL_VEHICLES, SEARCH_VEHICLES, SEARCH_VEHICLES_BY_PRICE_RANGE } from '../../Services/mutation'
import styles from './allCars.module.css'
import Image from 'next/image';
import car from '@/Themes/Images/car-svgrepo-com (1).svg'
import icon from '@/Themes/Images/snow-alt-svgrepo-com (1).svg'
import seat from '@/Themes/Images/seat-svgrepo-com.svg'
import Button from '@/Utils/Components/Button/Button';
import InputField from '@/Utils/Components/InputField/InputField';
import { useRouter } from 'next/navigation';

interface range {
    label:string,
    min: string
    max: string
}

function AllCars() {

    const router = useRouter();
    const vehicleTypes = ['All', 'SUV', 'Sedan', 'Truck', 'Coupe', 'Hatchback', 'Convertible', 'Wagon'];
    const { loading, error, data } = useQuery<{ getAllVehicles: Vehicle[] }>(GET_ALL_VEHICLES);
    const [selectedType, setSelectedType] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Vehicle[]>([]);
    // const [isSortedByPrice, setIsSortedByPrice] = useState(false);

    const priceRanges: range[]  = [
        { label: 'All', min: '0.0', max: 'Infinity' },
        { label: '0-1000', min: '0.0', max: '1000.0' },
        { label: '1000-2000', min: '1000', max: '2000' },
        { label: '2000-3000', min: '2000', max: '3000'},
        { label: '3000-4000', min: '3000', max: '4000'},
        { label: '4000-5000', min: '4000', max: '5000' },
        { label: '5000-6000', min: '5000', max: '6000' },
        { label: '5000-6000', min: '6000', max: '7000' },
    ];

    const [searchVehicles, { loading: searchLoading, error: searchError }] = useLazyQuery(SEARCH_VEHICLES, {
        onCompleted: (data) => {
            setSearchResults(data.searchVehicles);
        },
    });

    const [searchVehiclesByPriceRange] = useLazyQuery(SEARCH_VEHICLES_BY_PRICE_RANGE, {
        onCompleted: (data) => {
            setSearchResults(data.searchVehiclesByPriceRange);
        },
    });

    const [selectedRange, setSelectedRange] = useState(priceRanges[0]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = Number(event.target.value);
        const range = priceRanges[selectedIndex];

        setSelectedRange(range);
        console.log(range.min,range.max);
        
 
        // Call the new lazy query with the selected price range
        searchVehiclesByPriceRange({ variables: { minPrice:  range.min , maxPrice: range.max } });
    };
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
    if (error || searchError) return <p>Error: {error?.message ?? searchError?.message}</p>;

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

                <select value={priceRanges.indexOf(selectedRange)} onChange={handleChange}>
                    {priceRanges.map((range, index) => (
                        <option key={index} value={index}>
                            {range.label}
                        </option>
                    ))}
                </select>
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
                                <Image src={vehicle.primaryimage} alt={vehicle.name} height={200} width={300} />

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