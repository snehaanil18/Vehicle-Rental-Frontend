
'use client';
import { gql, useQuery } from '@apollo/client';
import React from 'react';

interface User {
    id: string;
    name: string;
    email: string;
}


const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

const HomePage = () => {

  const { loading, error, data } = useQuery<{ users: User[]}>(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {data?.users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default HomePage;
