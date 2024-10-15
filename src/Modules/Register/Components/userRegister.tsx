"use client";
import React, { useState } from 'react';
import { ADD_USER } from '../Services/mutations';
import { useMutation } from '@apollo/client';
import InputField from '@/Utils/Components/InputField/InputField';
import styles from './register.module.css';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2'

type UserDetails = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
};

function Register() {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<UserDetails>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
    });
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');

    const [errors, setErrors] = useState<Partial<Record<keyof UserDetails, string>>>({});
    const [addUser, { loading, error }] = useMutation(ADD_USER, {
        onCompleted: () => {

            // Show success alert
            Swal.fire({
                title: 'Success!',
                text: 'Registration successful! Please log in',
                icon: 'success',
                confirmButtonText: 'OK'
            })

            // Redirect to login page
            if (redirect) {
                router.push(redirect);
            } else {
                router.push('/login'); 
            }
            setUserDetails({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone: '',
                city: '',
                state: '',
                country: '',
                pincode: '',
            });
            setErrors({}); // Clear errors on successful submission
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name as keyof UserDetails]: value,
        }));

        // Clear the error for the field being edited
        setErrors((prevErrors) => ({ ...prevErrors, [name as keyof UserDetails]: '' }));

        // Validate the field immediately
        validateField(name as keyof UserDetails, value);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name as keyof UserDetails, value);
    };

    const validateField = (name: keyof UserDetails, value: string) => {
        let errorMessage = '';

        // Check for required fields
        if (value === '') {
            errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
        }

        // Additional validations based on the field
        switch (name) {
            case 'phone':
                if (value.length < 10 || value.length > 15 || !/^\d+$/.test(value)) {
                    errorMessage = 'Phone number must be between 10 and 15 digits and contain only numbers.';
                }
                break;
            case 'pincode':
                if (!/^\d{6}$/.test(value)) {
                    errorMessage = 'Pincode must be a 6-digit number.';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Email is not valid.';
                }
                break;
            case 'password':
                if (value.length < 6) {
                    errorMessage = 'Password must be at least 6 characters long.';
                }
                break;
            case 'confirmPassword':
                if (value !== userDetails.password) {
                    errorMessage = 'Passwords do not match.';
                }
                break;
            default:
                break;
        }

        // Update the errors state
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));
    };

    const validateFields = () => {
        const keys: (keyof UserDetails)[] = [
            'name',
            'email',
            'password',
            'confirmPassword',
            'phone',
            'city',
            'state',
            'country',
            'pincode',
        ];

        let isValid = true;

        // Validate all fields to check if there are any remaining errors
        for (const key of keys) {
            if (userDetails[key] === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [key]: `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`,
                }));
                isValid = false;
            }
        }

        // Check if passwords match
        if (userDetails.password !== userDetails.confirmPassword) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword: 'Passwords do not match.',
            }));
            isValid = false;
        }

        return isValid; // Return true if all fields are valid
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateFields();

        if (!isValid) {
            return; // Stop submission if there are errors
        }

        try {
            await addUser({ variables: userDetails });
        } catch (err) {
            console.error('Error adding user:', err);
        }
    };

    return (
        <div className={styles.register}>
            <h1>REGISTER HERE</h1>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Name"
                        type="text"
                        name="name"
                        value={userDetails.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your name"
                    />
                    {errors.name && <p className={styles.error}>{errors.name}</p>}

                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className={styles.error}>{errors.email}</p>}

                    <InputField
                        label="Phone"
                        type="text"
                        name="phone"
                        value={userDetails.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your phone number"
                    />
                    {errors.phone && <p className={styles.error}>{errors.phone}</p>}

                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={userDetails.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your password"
                    />
                    {errors.password && <p className={styles.error}>{errors.password}</p>}

                    <InputField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword" // Use the new field
                        value={userDetails.confirmPassword} // Update state value
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>} 


                    <InputField
                        label="City"
                        type="text"
                        name="city"
                        value={userDetails.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your city"
                    />
                    {errors.city && <p className={styles.error}>{errors.city}</p>}

                    <InputField
                        label="State"
                        type="text"
                        name="state"
                        value={userDetails.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your state"
                    />
                    {errors.state && <p className={styles.error}>{errors.state}</p>}

                    <InputField
                        label="Country"
                        type="text"
                        name="country"
                        value={userDetails.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your country"
                    />
                    {errors.country && <p className={styles.error}>{errors.country}</p>}

                    <InputField
                        label="Pincode"
                        type="text"
                        name="pincode"
                        value={userDetails.pincode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your pincode"
                    />
                    {errors.pincode && <p className={styles.error}>{errors.pincode}</p>}



                    <div className={styles.button}>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>

                        <div className={styles.login}>Already Registered?
                            <Link href={'/login'}>Login Here</Link>
                        </div>
                    </div>


                    {error && <p className={styles.error}>Error: {error.message}</p>}
                </form>

            </div>


        </div>
    );
}

export default Register;