import ProfileForm from "@/components/Profile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  return (
  <div className="flex justify-center mt-2 items-center bg-slate-100">
    <div className="sm:shadow-xl sm:bg-white rounded-xl">
      <ProfileForm session={session}></ProfileForm>
    </div>
  </div>
  )
}