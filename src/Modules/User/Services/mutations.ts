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
    $bookingId: String!,
    $amountPaid: Float!,
    $status: String!,
    $vehicleid: String!,
    $pickupdate: String!,
     $dropoffdate: String!
  ) {
    createPayment(bookingId: $bookingId, amountPaid: $amountPaid, status: $status,vehicleid: $vehicleid,pickupdate: $pickupdate, dropoffdate: $dropoffdate ) {
      bookingId
      amountPaid
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