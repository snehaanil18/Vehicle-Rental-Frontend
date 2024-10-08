"use client";
import React, { useState } from 'react';
import { commonPlacesInKochi } from '@/Utils/Models/commonPlaces';
import styles from './search.module.css'; // Import the CSS module

function Search() {
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropLocation, setDropLocation] = useState('');
    const [pickupDateTime, setPickupDateTime] = useState('');
    const [dropDateTime, setDropDateTime] = useState('');

    const handleClick = () => {
        console.log(pickupLocation, dropLocation, pickupDateTime);

    }

    return (
        <div className={styles.container}>

            <div>
                <label htmlFor="pickupLocation">Pick-up Location</label>
                <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                >
                    <option value="" disabled>Select pick-up location</option>
                    {commonPlacesInKochi.map((place, index) => (
                        <option key={index} value={place}>
                            {place}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="Pick-up Date & Time">Pick-up Date & Time</label>
                <input
                    type="datetime-local"
                    value={pickupDateTime}
                    onChange={(e) => setPickupDateTime(e.target.value)}
                />
            </div>



            <div>
                <label htmlFor='Drop-off Location'>Drop-off Location</label>
                <select
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                >
                    <option value="" disabled>Select drop-off location</option>
                    {commonPlacesInKochi.map((place, index) => (
                        <option key={index} value={place}>
                            {place}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor='Drop-off Date & Time'>Drop-off Date & Time</label>
                <input
                    type="datetime-local"
                    value={dropDateTime}
                    onChange={(e) => setDropDateTime(e.target.value)}
                />
            </div>

            <div>
                <button onClick={() => handleClick()}>Rent</button>
            </div>

        </div>
    );
}

export default Search;
