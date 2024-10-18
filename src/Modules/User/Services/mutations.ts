import { gql } from '@apollo/client';

export const CREATE_BOOKING_MUTATION = gql`
  mutation CreateBooking(
    $vehicleid: String!,
    $vehiclename: String!,
    $pickupdate: String!,
    $pickuplocation: String!,
    $dropoffdate: String!,
    $dropofflocation: String!,
    $totalamount: Float!,
    $username: String!,
    $userid: String!,
    $paymentstatus: PaymentStatus!
  ) {
    createBooking(
      vehicleid: $vehicleid,
      vehiclename: $vehiclename,
      pickupdate: $pickupdate,
      pickuplocation: $pickuplocation,
      dropoffdate: $dropoffdate,
      dropofflocation: $dropofflocation,
      totalamount: $totalamount,
      username: $username,
      userid: $userid,
      paymentstatus: $paymentstatus
    ) {
    success
    message
    booking {
      id
      vehicleid
      vehiclename
      pickupdate
      pickuplocation
      dropoffdate
      dropofflocation
      totalamount
      username
      userid
      paymentstatus
    }
  }
  }
`;

export const CREATE_PAYMENT_ORDER = gql`
  mutation CreatePaymentOrder($amount: Float!) {
    createPaymentOrder(amount: $amount) {
      id
      currency
      amount
    }
  }
`;

export const VERIFY_PAYMENT = gql`
  mutation VerifyPayment(
    $orderId: String!,
    $paymentId: String!,
    $signature: String!
  ) {
    verifyPayment(orderId: $orderId, paymentId: $paymentId, signature: $signature) {
      success
    }
  }
`;

export const CREATE_PAYMENT = gql`
  mutation CreatePayment(
    $bookingid: String!,
    $amountpaid: Float!,
    $status: String!,
    $vehicleid: String!,
    $pickupdate: String!,
     $dropoffdate: String!
  ) {
    createPayment(bookingid: $bookingid, amountpaid: $amountpaid, status: $status,vehicleid: $vehicleid,pickupdate: $pickupdate, dropoffdate: $dropoffdate ) {
      bookingid
      amountpaid
      status
    }
  }
`;

export const CHECK_AVAILABILITY_QUERY = gql`
  query CheckAvailability($vehicleId: ID!, $pickupdate: String!, $dropoffdate: String!) {
    getVehicleAvailability(vehicleId: $vehicleId, pickupdate: $pickupdate, dropoffdate: $dropoffdate) {
      available
      message
    }
  }
`;

export const UPDATE_PROFILE_IMAGE = gql`
  mutation updateProfileImage($id: ID!, $file: Upload!) {
    updateProfileImage(id: $id, file: $file) {
      id
      name
      email
      profileimage
    }
  }
`;

export const GET_USER_BOOKINGS = gql`
  query GetUserBookings($userid: ID!) {
    getBookingsByUser(userid: $userid) {
      id
      vehiclename
      pickupdate
      pickuplocation
      dropoffdate
      dropofflocation
    }
  }
`;

export const UPDATE_USER = gql`
mutation UpdateUser($id: ID!, $name: String, $email: String, $phone: String, $city: String, $state: String, $country: String, $pincode: String) {
  updateUser(
    id: $id,
    name: $name,
    email: $email,
    phone: $phone,
    city: $city,
    state: $state,
    country: $country,
    pincode: $pincode
  ) {
    id
    name
    email
    phone
    city
    state
    country
    pincode
    profileimage
  }
}
`;