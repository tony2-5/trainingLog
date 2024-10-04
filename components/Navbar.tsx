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
  <Navbar className="bg-slate-500	text-white p-2 border-b-2	border-slate-700">
    <NavbarContent className="flex gap-4" justify="start">
      <NavbarBrand>
        <Link className="flex gap-2 items-center hover:bg-slate-600 p-1 rounded" href="/">
          <Image src={icon} height={32} width={32} alt="Running logo"/>
          <p className="small-font font-medium font-raleway">Tony&apos;s Training</p>
        </Link>
      </NavbarBrand>
    </NavbarContent>
    <NavbarContent className="flex gap-4" justify="center">
      <NavbarItem>
        <Link href="/dashboard">
          <h2 className="hover:bg-slate-600 p-1 rounded small-font font-medium font-raleway">Dashboard</h2>
        </Link>
      </NavbarItem>
    </NavbarContent>
    <NavbarContent justify="end">
      {!session &&
      <>
        <NavbarItem className="flex hover:bg-slate-600 p-1 rounded small-font font-medium font-raleway">
          <LoginButton/>
        </NavbarItem>
        <NavbarItem className="flex hover:bg-slate-600 p-1 rounded small-font font-medium font-raleway">
          <Link href="/register">Register</Link>
        </NavbarItem>
      </>
      }
      {session && 
      <div className="flex gap-6">
        <NavbarItem className="flex hover:bg-slate-600 p-1 rounded small-font font-medium font-raleway">
          <LogoutButton />
        </NavbarItem>
        <NavbarItem className="flex">
          <Link className="flex gap-2 items-center" href="/profile">
            <Image className="h-12 w-12 hover:bg-slate-600 p-1 rounded" src={profilepic} alt="Default profile picture"/>
          </Link>
        </NavbarItem>
      </div>
      }
    </NavbarContent>
  </Navbar>
  )
}