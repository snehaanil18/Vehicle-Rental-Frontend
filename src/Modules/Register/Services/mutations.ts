import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation createUser(
  $name: String!,
  $email: String!,
  $password: String!,
  $phone: String!,
  $city: String!,
  $state: String!,
  $country: String!,
  $pincode: String!
) {
  createUser(
    name: $name,
    email: $email,
    password: $password,
    phone: $phone,
    city: $city,
    state: $state,
    country: $country,
    pincode: $pincode
  ) {
    userId
    success
    message
  }
}
`;

export const VERIFY_OTP = gql`
  mutation VerifyOTP($id: ID!,$phone: String!, $otp: String!) {
    verifyOTP(id: $id,phone: $phone, otp: $otp) {
      success
      message
    }
  }
`;