import { gql } from '@apollo/client';

export const LOGIN_USER_MUTATION = gql`
mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
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