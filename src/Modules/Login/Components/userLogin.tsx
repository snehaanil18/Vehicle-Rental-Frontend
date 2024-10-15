"use client";
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';;
import { useMutation } from '@apollo/client';
import { LOGIN_USER_MUTATION } from '../Services/mutation'
import Swal from 'sweetalert2'
import { setUser } from '@/Utils/Redux/Slices/userSlice';
import { RootState } from '@/Utils/Redux/store';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './login.module.css'
import InputField from '@/Utils/Components/InputField/InputField';
import Link from 'next/link';


function UserLogin() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [userDetail, setUserDetail] = useState({ email: '', password: '' });
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER_MUTATION);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await loginUser({
                variables: userDetail,
            });

            if (response.data) {
                const details = response.data.loginUser

                // Show success alert
                Swal.fire({
                    title: 'Success!',
                    text: 'Login successful!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                // Store or use the user details as needed
                dispatch(setUser({ id: details.id, name: details.name, email: details.email }));
                if (redirect) {
                    router.push(redirect);
                } else {
                    router.push('/');
                }

            }
            else {
                if (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Login Failed!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            }

        } catch (err) {
            console.error('Error logging in:', err);
            Swal.fire({
                title: 'Error!',
                text: 'Login Failed!',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Update userDetail state based on input name
        setUserDetail({
            ...userDetail,
            [name]: value, 
        });

    };

    return (
        <div className={styles.login}>
            <h1>LOGIN HERE</h1>
            <div className={styles.container}>
                
                <form onSubmit={handleLogin}>
                    <div>
                        <InputField
                            label='Email'
                            type="email"
                            name="email"
                            value={userDetail.email}
                            onChange={handleChange}
                            placeholder='Enter your email address'
                        />
                    </div>
                    <div>
                        <InputField
                            type="password"
                            name="password"
                            value={userDetail.password}
                            onChange={handleChange}
                            label='Password'
                            placeholder='Enter your password'
                        />
                    </div>
                    <div className={styles.button}>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <div className={styles.register}>Don&apos;t have a Account?
                            <Link  href={`/register?redirect=login?${encodeURIComponent(redirect || '/')}`}>Register Here</Link>
                        </div>
                    </div>
    
                    {error && <p>Error: {error.message}</p>}
                </form>
                {user && (
                    <p style={{display:'none'}}>
                        status : {user.isLoggedIn}
                    </p>
                )}
            </div>
        </div>
    )
}

export default UserLogin