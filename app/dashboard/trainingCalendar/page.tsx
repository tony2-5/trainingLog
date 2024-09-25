import TrainingCalendar from '@/components/TrainingCalendar'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function TrainingCalendarPage() {
  const session = await getServerSession(authOptions)
  return (
    <TrainingCalendar session={session}></TrainingCalendar>
  )
}