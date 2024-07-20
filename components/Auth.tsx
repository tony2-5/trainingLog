'use client'

import { signIn, signOut } from 'next-auth/react'

export const LoginButton = () => {
  return <button onClick={() => signIn()}>Login</button>
}

export const LogoutButton = () => {
  return <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}>Logout</button>
}