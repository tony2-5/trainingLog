import TrainingGraph from "@/components/TrainingGraph";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekOfYear);

export default async function TrainingGraphPage() {
  const session = await getServerSession(authOptions)
  // can loop starting from 16 going to 0
  let daysArr:Array<string> = []
  let endOfWeek = dayjs().endOf('week')
  for(let i=0;i<112;i++) {
    daysArr.push(endOfWeek.subtract(i,'day').format("YYYY-MM-DD"))
  }
  const chunkSize = 7
  let chunkedArr = []
  // split 112 day (16 weeks) array array into 7 day increments
  for (let i = 0; i < daysArr.length; i += chunkSize) {
      let chunk = daysArr.slice(i, i + chunkSize)
      chunkedArr.push(chunk)
  }
  return (
    <TrainingGraph session={session} daysArr={daysArr} chunkedDaysArr={chunkedArr}></TrainingGraph>
  )
}