import Link from 'next/link'
import { Register } from "@/components/Register";

export default function RegisterPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl">Create your Account</h1>
        <Register />
        <p className="text-center">
          Have an account?{' '}
          <Link className="text-indigo-500 hover:underline" href="/signin">
            Sign in
          </Link>{' '}
        </p>
      </div>
    </div>
  )
}
