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
    id
    name
    email
  }
}
`;