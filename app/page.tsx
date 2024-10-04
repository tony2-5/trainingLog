import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Image from 'next/image';
import * as trainingGraphImg from "@/images/trainingGraph.png"
import * as calendar from "@/images/calendar.png"
import * as trainingSchedule1 from "@/images/trainingSchedule1.png"
import * as trainingSchedule2 from "@/images/trainingSchedule2.png"
import * as trainingSchedule3 from "@/images/trainingSchedule3.png"

export default async function Home() {
  return (
  <div>
    <div className="flex flex-col w-screen pt-8">
      <div className="flex justify-center">
        <h1 className="font-raleway text-6xl font-medium mt-2 mb-16">Welcome to Tony's Training</h1>
      </div>
      <div className="flex flex-col gap-12">
        <div className="flex">
          <div className="flex-1">
            <Image src={trainingSchedule1} alt="Training schedule"/>
          </div>
          <div className="flex justify-center items-center flex-1">
            <h2 className="font-raleway font-normal text-2xl">View your weekly mileage goals</h2>
          </div>
        </div>
        <div className="flex">
        <div className="flex-1">
            <Image src={trainingSchedule2} alt="Training schedule"/>
          </div>
          <div className="flex justify-center items-center flex-1">
            <h2 className="font-raleway font-normal text-2xl">Select a day to add, edit, and delete mileage</h2>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            <Image src={trainingSchedule3} alt="Training schedule"/>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <h2 className="font-raleway font-normal text-2xl">Hit the complete button to track your progress!</h2>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-center w-screen justify-center mt-20">
      <h2 className="font-raleway font-normal text-2xl">Visit the calendar page to see your training in month view</h2>
      <Image src={calendar} alt="Training data month calendar"/>
    </div>
    <div className="flex flex-col items-center w-screen justify-center mt-20">
      <h2 className="font-raleway font-normal text-2xl">Or visit the graph page to get your 16 week training insight!</h2>
      <Image src={trainingGraphImg} alt="Training data graph"/>
    </div>
  </div>
  );
}
