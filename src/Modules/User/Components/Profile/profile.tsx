
"use client";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/Utils/Redux/store';
import styles from './profile.module.css';
import Image from 'next/image';
import def from '@/Themes/Images/image-x-generic-symbolic-svgrepo-com.svg';
import add from '@/Themes/Images/image-add-svgrepo-com.svg';
import { UPDATE_PROFILE_IMAGE, GET_USER_BOOKINGS, UPDATE_USER, GET_USER, CANCEL_BOOKING } from '../../Services/mutations';
import { useMutation, useQuery } from '@apollo/client';
import Swal from 'sweetalert2';
import { Booking } from '@/Utils/Models/booking';
import edit from '@/Themes/Images/edit-2-svgrepo-com.svg';
import Modal from '@/Utils/Components/Modal/modal';
import InputField from '@/Utils/Components/InputField/InputField';
import { setUser } from '@/Utils/Redux/Slices/userSlice';



const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [show, setShow] = useState(false);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [showModal, setShowModal] = useState(false);
    
    const [editedProfile, setEditedProfile] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        country: '',
        pincode: ''
    });
    console.log('reux',user);
    console.log('edited',editedProfile);
    
    

    // Always call useQuery and useMutation hooks
    const { loading, error, data : userData} = useQuery(GET_USER);
    const { loading: bookingsLoading, error: bookingsError, refetch } = useQuery<{ getBookingsByUser: Booking[] }>(GET_USER_BOOKINGS, {
        variables: { userid: user.id },
        onCompleted: (data) => {
            setBookings(data?.getBookingsByUser ?? []);
        },
    });

        const [cancelBooking] = useMutation(CANCEL_BOOKING, {
        onCompleted: (data) => {
            refetch()
            if (data.cancelBooking.success) {
                Swal.fire('Cancelled!', data.cancelBooking.message, 'success');
                
            } else {
                Swal.fire('Error!', data.cancelBooking.message, 'error');
            }
        },
        onError: (error) => {
            console.error('Error!', 'Failed to cancel booking', error);
        }
    });

    // Handle booking cancellation on button click
    const handleCancelBooking = (bookingId: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to cancel this booking?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                cancelBooking({ variables: { bookingId } });
            }
        });
    };

    useEffect(() => {
        if (userData) {
          const details = userData.user
          dispatch(setUser({ id: details.id, name: details.name, email: details.email, phone: details.phone, city: details.city,state: details.state,country: details.country,pincode: details.pincode, profileimage: details.profileimage || null }));
        }
      }, [userData, dispatch]);

      useEffect(() => {
        
        setEditedProfile({
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            city: user.city || '',
            state: user.state || '',
            country: user.country || '',
            pincode: user.pincode || ''
        });
    }, [user]);
    

    const [updateProfileImage] = useMutation(UPDATE_PROFILE_IMAGE, {
        onCompleted: (data) => {
            console.log(data.updateUserProfileImage);
            Swal.fire({
                title: 'Success!',
                text: 'Profile Image Updated',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        },
        onError: (error) => {
            console.error("Error updating profile image:", error);
        },
    });

    const [updateUser] = useMutation(UPDATE_USER, {
        onCompleted: (data) => {
            const updatedUser = data.updateUser; 
            dispatch(setUser({
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                city: updatedUser.city,
                state: updatedUser.state,
                country: updatedUser.country,
                pincode: updatedUser.pincode,
                profileimage: updatedUser.profileimage
            }));
            Swal.fire({
                title: 'Success!',
                text: 'Profile Updated',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        },
        onError: (error) => {
            console.error("Error updating user:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update profile',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        },
    });

    // Handle image selection
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target?.files?.[0];
        if (file) {
            setSelectedImage(file);
            uploadImage(file);
        }
    };

    const showOption = () => {
        setShow(!show);
    };

    // Handle image upload
    const uploadImage = (file: File) => {
        console.log('upload image');
        
        updateProfileImage({ variables: { id: user.id, file } });
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // Handle form field change
    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async () => {
        try {
            await updateUser({ variables: { id: user.id, ...editedProfile } });
            closeModal();
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    // Early return for loading and error handling
    if (loading || bookingsLoading) return <p>Loading...</p>;
    if (error || bookingsError) return <p>Error: {error?.message || bookingsError?.message}</p>;

    const formatDate = (timestamp: string) => {
        const date = new Date(parseInt(timestamp));
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    };
    return (
        <div>

            <div className={styles.profileContainer}>
                <div className={styles.profileContent}>
                    <div className={styles.profileImage}>
                        <Image
                            id={styles.profile}
                            src={selectedImage ? URL.createObjectURL(selectedImage) : user.profileimage ?? def}
                            alt="Profile"
                            width={100}
                            height={100}
                        />
                        <label htmlFor="profile">
                            <button onClick={showOption} className={styles.changeImageBtn}>
                                <Image src={add} alt="Profile" width={25} height={25} />
                            </button>
                        </label>
                        {show && <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}

                        />}


                    </div>
                    <div className={styles.profileDetails}>

                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>City:</strong> {user.city}</p>
                        <p><strong>State:</strong> {user.state}</p>
                        <p><strong>Country:</strong> {user.country}</p>
                        <p><strong>Pincode:</strong> {user.pincode}</p>
                    </div>
                    <div className={styles.profileEdit}>
                        <button onClick={() => setShowModal(true)}>
                            <Image src={edit} alt='edit' height={20} width={25} />
                        </button>
                    </div>

                </div>





                {showModal && (
                    <Modal onClose={closeModal}>
                        <div className={styles.modalContent}>
                        
                            <h2>Edit Profile</h2>
                            
                                <InputField type="text" label='Name:' name='name' value={editedProfile.name} onChange={handleFieldChange}/>
                                <InputField type="email" label='Email'name="email" value={editedProfile.email} onChange={handleFieldChange}/>
                                <InputField label='Phone' type='text' name="phone" value={editedProfile.phone} onChange={handleFieldChange}/>
                                <InputField label='City'type="text" name="city" value={editedProfile.city} onChange={handleFieldChange}/>
                                <InputField label='State'type="text" name="state" value={editedProfile.state} onChange={handleFieldChange}/>
                                <InputField label='Country'type="text" name="country" value={editedProfile.country} onChange={handleFieldChange}/>
                                <InputField label='Pincode' type="text" name="pincode" value={editedProfile.pincode} onChange={handleFieldChange}/>

                                <div className={styles.modalActions}>
                                    
                                    <button onClick={handleUpdateProfile}>Save Changes</button>
                                </div>
                            
                        </div>
                    </Modal>
                )}

            </div>

            <div className={styles.bookingsSection}>
                    <h3>Booking History</h3>
                    {bookingsLoading && <p>Loading bookings...</p>}
                    {bookingsError && <p>Error loading bookings: {bookingsError}</p>}
                    {bookings.length === 0 && !bookingsLoading && <p>No bookings found.</p>}
                    <table>
                        <thead>
                            <tr>
                                <th>Vehicle</th>
                                <th>Pickup Location</th>
                                <th>Pickup Date</th>
                                <th>Dropoff Location</th>
                                <th>Dropoff Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        {bookings.length > 0 && (
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.id} className={styles.bookingItem}>
                                        <td>{booking.vehiclename}</td>
                                        <td>{booking.pickuplocation}</td>
                                        <td>{formatDate(booking.pickupdate)}</td>
                                        <td>{booking.dropofflocation}</td>
                                        <td>{formatDate(booking.dropoffdate)}</td>
                                        <td className={styles.cancel}>
                                            <button onClick={() => handleCancelBooking(booking.id)}>Cancel</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>

        </div>

    );
};

export default Profile;
