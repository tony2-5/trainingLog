'use client'

import { Alert } from '@/components/ui/alert'
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const REGISTER_USER = gql`
mutation Mutation($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name) {
    id
    email
    name
  }
}
`

export const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUser] = useState('')
  const [addUser, { data, loading, error }] = useMutation(REGISTER_USER);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addUser({ variables: { email: email, password: password, name: username } });
    setEmail('')
    setPassword('')
    setUser('')
  }

  return (
    <>
      {error && <Alert variant='destructive'>{error.message}</Alert>}
      {data && <Alert variant='success'>Successfully Registered!</Alert>}
      <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
        <div className="grid w-full items-center gap-1.5">
          <Input
            className="w-full"
            required
            value={username}
            onChange={(e) => setUser(e.target.value)}
            id="username"
            type="text"
            label="Username" 
            placeholder="Enter your username"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Input
            className="w-full"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            label="Email" 
            placeholder="Enter your email"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Input
            className="w-full"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            label="Password" 
            placeholder="Enter your password"
          />
        </div>
        <div className="w-full">
          <Button type='submit' className="btn btn-blue" size="lg">
            Register
          </Button>
        </div>
      </form>
    </>
  )
}
