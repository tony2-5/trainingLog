import ScheduleCalendar from "@/components/ScheduleCalendar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function SchedulePage() {
  const session = await getServerSession(authOptions)
  return (
    <ScheduleCalendar session={session}></ScheduleCalendar>
  )
}