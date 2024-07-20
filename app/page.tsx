import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Data } from "@/components/Getdata";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
  <div>
    <pre>{JSON.stringify(session)}</pre>
    <Data />
  </div>
  );
}
