import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Data } from "@/components/Getdata";
import { LoginButton, LogoutButton } from "@/components/Auth";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
  <div>
    LOGIN
    <pre>{JSON.stringify(session)}</pre>
    <Data />
  </div>
  );
}
