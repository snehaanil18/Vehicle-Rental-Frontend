"use client";
import React, { useEffect, useState } from 'react';
import { commonPlacesInKochi } from '@/Utils/Models/commonPlaces';
import styles from './search.module.css';
import { Vehicle } from '@/Utils/Models/Vehicle';
import { useSelector } from 'react-redux';
import { RootState } from '@/Utils/Redux/store';
import { useRouter } from 'next/navigation';
import { useMutation, useLazyQuery } from '@apollo/client';
import { CREATE_BOOKING_MUTATION, CREATE_PAYMENT_ORDER, VERIFY_PAYMENT, CREATE_PAYMENT, CHECK_AVAILABILITY_QUERY } from '../../Services/mutations';
import { RazorpayOptions, RazorpayResponse } from '@/Utils/Models/razorpay'
import { CreatePaymentOrderResult, CreateBookingResponse } from '@/Utils/Models/booking'
import Swal from 'sweetalert2'

interface SearchProps {
  vehicle: Vehicle;
}

interface data {
  available: boolean
  message: string
}




const Search: React.FC<SearchProps> = ({ vehicle }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [pickupDateTime, setPickupDateTime] = useState('');
  const [dropDateTime, setDropDateTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({
    pickupLocation: '',
    pickupDateTime: '',
    dropLocation: '',
    dropDateTime: ''
  });

  const [verifyPayment] = useMutation(VERIFY_PAYMENT);
  const [createBooking] = useMutation<CreateBookingResponse>(CREATE_BOOKING_MUTATION);
  const [createPaymentOrder] = useMutation<CreatePaymentOrderResult>(CREATE_PAYMENT_ORDER);
  const [createPayment] = useMutation(CREATE_PAYMENT);

  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const today = new Date().toISOString().slice(0, 16);

  const [checkAvailability, { data: availabilityData, loading: availabilityLoading, error: availabilityError }] =
    useLazyQuery<{ getVehicleAvailability: data }>(CHECK_AVAILABILITY_QUERY);

  useEffect(() => {
    if (pickupDateTime && dropDateTime) {
      const formattedPickupDateTime = pickupDateTime ? new Date(pickupDateTime).toISOString() : '';
      const formattedDropDateTime = dropDateTime ? new Date(dropDateTime).toISOString() : '';

      checkAvailability({
        variables: {
          vehicleId: vehicle.id,
          pickupdate: formattedPickupDateTime || null,
          dropoffdate: formattedDropDateTime || null,
        },
      });
    }
  }, [pickupDateTime, dropDateTime, checkAvailability, vehicle.id]);

  const validateFields = () => {
    const newErrors = {
      pickupLocation: !pickupLocation ? 'Pick-up location is required' : '',
      pickupDateTime: !pickupDateTime ? 'Pick-up date and time is required' : '',
      dropLocation: !dropLocation ? 'Drop-off location is required' : '',
      dropDateTime: !dropDateTime ? 'Drop-off date and time is required' : ''
    };
    setErrors(newErrors);

    // Return true if there are no errors
    return !Object.values(newErrors).some(error => error);
  };


  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay SDK loaded');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);



  const handleClick = async () => {
console.log('click');

    if (!validateFields()) return;

    if (!user.id) {
      router.push(`/login?redirect=/car/${vehicle.id}`);
      return;
    }

    const pickupDate = new Date(pickupDateTime);
    const dropDate = new Date(dropDateTime);
    const currentDate = new Date();

    if (pickupDate <= currentDate) {
      setErrors(prevErrors => ({
        ...prevErrors,
        pickupDateTime: "You must make the booking at least one day in advance."
      }));
      return;
    }

    if (dropDate <= pickupDate) {
      setErrors(prevErrors => ({
        ...prevErrors,
        dropDateTime: "Drop-off date and time must be after the pick-up date and time."
      }));
      return;
    }

    if (availabilityLoading) {
      setErrors(prevErrors => ({
        ...prevErrors,
        pickupDateTime: "Checking vehicle availability..."
      }));
      return;
    }

    if (availabilityError || !availabilityData?.getVehicleAvailability.available) {
      setErrors(prevErrors => ({
        ...prevErrors,
        pickupDateTime: availabilityError?.message || "Vehicle not available for the selected dates."
      }));
      return;
    }


    const timeDifference = dropDate.getTime() - pickupDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    const bookingDetails = {
      vehicleid: vehicle.id,
      vehiclename: vehicle.name,
      pickupdate: pickupDateTime,
      pickuplocation: pickupLocation,
      dropoffdate: dropDateTime,
      dropofflocation: dropLocation,
      totalamount: daysDifference * vehicle.price,
      username: user.name,
      userid: user.id,
      paymentstatus: "Pending",
    };

    

    const { data: bookingData } = await createBooking({ variables: bookingDetails });
    console.log(bookingData);
    
    const details = bookingData?.createBooking;
    const value = details?.booking;


    if (!details) {
      setErrorMessage("Booking creation failed.");
      return;
    }

    const { data: paymentData } = await createPaymentOrder({ variables: { amount: value.totalamount * 100 } });

    if (!paymentData) {
      setErrorMessage("Payment order creation failed.");
      return;
    }




    if (paymentData) {
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: paymentData.createPaymentOrder.amount,
        currency: paymentData.createPaymentOrder.currency,
        name: "Swift Cars",
        description: "Booking Payment",
        order_id: paymentData.createPaymentOrder.id,
        handler: async (response: RazorpayResponse) => {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

          const verificationResult = await verifyPayment({
            variables: {
              orderId: razorpay_order_id,
              paymentId: razorpay_payment_id,
              signature: razorpay_signature
            }
          });

          const resp = verificationResult.data.verifyPayment


          if (resp.success == true) {
            const paymentDetails = {
              bookingid: value?.id,
              amountpaid: parseFloat(value.totalamount),
              status: "Completed",
              vehicleid: vehicle.id,
              pickupdate: pickupDateTime,
              dropoffdate: dropDateTime,
            };
    

            const { data: paymentData } = await createPayment({ variables: paymentDetails });
  

            if (paymentData) {
              Swal.fire({
                title: 'Success!',
                text: 'Payment successful!',
                icon: 'success',
                confirmButtonText: 'OK'
            })
            }

          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Payment failed!',
              icon: 'error',
              confirmButtonText: 'OK'
          })
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        notes: {
          bookingid: value.id,
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  };
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
        {errors.pickupLocation && <p className={styles.error}>{errors.pickupLocation}</p>}
      </div>

      <div>
        <label htmlFor="pickupDateTime">Pick-up Date & Time</label>
        <input
          type="datetime-local"
          min={today} // Set minimum to the current date and time
          value={pickupDateTime}
          onChange={(e) => setPickupDateTime(e.target.value)}
        />
         {errors.pickupDateTime && <p className={styles.error}>{errors.pickupDateTime}</p>}
      </div>

      <div>
        <label htmlFor="dropLocation">Drop-off Location</label>
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
        {errors.dropLocation && <p className={styles.error}>{errors.dropLocation}</p>}
      </div>

      <div>
        <label htmlFor="dropDateTime">Drop-off Date & Time</label>
        <input
          type="datetime-local"
          min={pickupDateTime || today} // Ensure drop-off time is after pick-up
          value={dropDateTime}
          onChange={(e) => setDropDateTime(e.target.value)}
        />
        {errors.dropDateTime && <p className={styles.error}>{errors.dropDateTime}</p>}
      </div>

          {errorMessage && <div>{errorMessage} </div>}
      <div>
        <button className={styles.rentButton}  onClick={handleClick}>
          Rent
        </button>
      </div>

    </div>
  );
};

export default Search;
