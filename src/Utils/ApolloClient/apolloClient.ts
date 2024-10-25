import { ApolloClient, InMemoryCache, from } from '@apollo/client';
// @ts-expect-error - TypeScript doesn't have type definitions for this module
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_BACKEND,
});


const authLink = setContext((_, { headers }) => {

  const token = sessionStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",  
    }
  };
});

// Create the Apollo Client
const client = new ApolloClient({
  link: from([authLink, uploadLink]),
  cache: new InMemoryCache(),
});

export default client;