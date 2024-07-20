'use client'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from 'react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'

export const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    })

    if(response?.ok) {
      router.push("/dashboard");
      router.refresh()
    } else {
      console.log(response?.error)
      toast("Credentials do not match!", { type: "error" });
    }
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
      <div className="w-full">
        <Button type='submit' className="w-full" size="lg">
          Login
        </Button>
      </div>
    </form>
  )
}
