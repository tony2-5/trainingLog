import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "./Auth";
import Link from 'next/link'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";

export default async function Nav() {
  const session = await getServerSession(authOptions)
  return ( 
    <Navbar>
    {session && <NavbarBrand><p className="font-bold text-inherit">Placeholder Name</p></NavbarBrand>}
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
        <Link color="foreground" href="/">
          Features
        </Link>
      </NavbarItem>
      <NavbarItem isActive>
        <Link href="#" aria-current="page">
          Customers
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#">
          Integrations
        </Link>
      </NavbarItem>
    </NavbarContent>
    <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
        <LoginButton/>
      </NavbarItem>
      <NavbarItem className="hidden lg:flex">
        {session && <LogoutButton/>}
      </NavbarItem>
      <NavbarItem>
        <Link href="/register">Register</Link>
      </NavbarItem>
    </NavbarContent>
  </Navbar>
  )
}