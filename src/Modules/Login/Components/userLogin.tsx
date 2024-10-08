"use client";
import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { LOGIN_USER_MUTATION } from '../Services/mutation'
import Swal from 'sweetalert2'

function UserLogin() {
    const [userDetail, setUserDetail] = useState({ email: '', password: '' });
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER_MUTATION);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await loginUser({
                variables: userDetail, // Pass userDetail object here
            });

            if (response.data) {
                // Show success alert
                Swal.fire({
                    title: 'Success!',
                    text: 'Login successful!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                // Store or use the user details as needed
            }
        } catch (err) {
            console.error('Error logging in:', err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Update userDetail state based on input name
        setUserDetail({
            ...userDetail,
            [name]: value, // Dynamically update either email or password
        });
    };
    return (
        <div>
            <div>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email" // Use name to identify input field
                            value={userDetail.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password" // Use name to identify input field
                            value={userDetail.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p>Error: {error.message}</p>}
                </form>
            </div>
        </div>
    )
}

export default UserLogin