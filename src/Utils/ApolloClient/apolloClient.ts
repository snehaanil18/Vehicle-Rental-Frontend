import { ApolloClient, InMemoryCache, from } from '@apollo/client';
// @ts-expect-error - TypeScript doesn't have type definitions for this module
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
});

// Set up authentication link to include JWT token in headers
const authLink = setContext((_, { headers }) => {
  // Get the token from localStorage (or sessionStorage)
  const token = sessionStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",  // Add token to the Authorization header
    }
  };
});

// Create the Apollo Client
const client = new ApolloClient({
  link: from([authLink, uploadLink]),
  cache: new InMemoryCache(),
});

export default client;