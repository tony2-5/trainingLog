export { default } from 'next-auth/middleware'

/*Middleware to protect dashboard routes unless logged in*/
export const config = { matcher: [
  '/dashboard/:path*',
]}