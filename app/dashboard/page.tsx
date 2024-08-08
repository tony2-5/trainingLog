'use client'
import { useQuery, gql } from '@apollo/client'
import { useEffect } from 'react';

const GET_USERS = gql`
  query Users {
    users {
      id
      createdAt
      name
      email
    }
  }
`
export default function Home() {
  const { loading, error, data } = useQuery(GET_USERS);
  useEffect(() => {
    console.log(data)
  }, [data,loading])
  return (
  <div>
    <h1>List of Users</h1>
    {loading && <p>Loading...</p>}
    {error && <p>Error: {error.message}</p>}
    {data && data.users.map((user: any) => (
      <div key={user.id}>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>Created at: {user.createdAt}</p>
      </div>
    ))}
  </div>
  );
}
