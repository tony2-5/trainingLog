'use client'

import { Alert } from '@/components/ui/alert'
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from 'react'
import { signIn } from 'next-auth/react';
export const SignInForm = ({callbackUrl}: {callbackUrl: string}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn('credentials', {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: callbackUrl ?? "http://localhost:3000"
    })
    
  }

  return (
    <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
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
      {error && <Alert>{error}</Alert>}
      <div className="w-full">
        <Button type='submit' className="w-full" size="lg">
          Login
        </Button>
      </div>
    </form>
  )
}
