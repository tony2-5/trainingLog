import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"
import { LoginButton, LogoutButton } from "./Auth";
import Link from 'next/link'
import Image from 'next/image';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";
import icon from "@/images/icon.svg"
import profilepic from "@/images/defaultprofile.svg"

export default async function Nav() {
  const session = await getServerSession(authOptions)
  return ( 
    <Navbar>
    <NavbarContent className="hidden sm:flex gap-4" justify="start">
      <NavbarBrand>
        <Link className="hidden sm:flex gap-2 items-center" href="/">
          <Image src={icon} height={32} width={32} alt="Running logo"/>
          <p className="font-bold text-inherit">Tony-D Training</p>
        </Link>
      </NavbarBrand>
    </NavbarContent>
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
        <Link color="font-bold text-inherit" href="/dashboard">
          Dashboard
        </Link>
      </NavbarItem>
    </NavbarContent>
    <NavbarContent justify="end">
      {!session &&
      <>
        <NavbarItem className="hidden lg:flex">
          <LoginButton/>
        </NavbarItem>
        <NavbarItem>
          <Link href="/register">Register</Link>
        </NavbarItem>
      </>
      }
      {session && 
      <div className="sm:flex gap-6">
        <NavbarItem className="hidden lg:flex">
          <LogoutButton/>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link className="hidden sm:flex gap-2 items-center" href="/profile">
            <Image src={profilepic} height={48} width={48} alt="Default profile picture"/>
          </Link>
        </NavbarItem>
      </div>
      }
    </NavbarContent>
  </Navbar>
  )
}