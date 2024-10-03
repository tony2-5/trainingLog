'use client'
import { useEffect } from 'react';
import Link from 'next/link'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const exampleData = [
  {
    dateTitle: "YYYY-MM-DD",
    mileTotal: 10,
  },
  {
    dateTitle: "YYYY-MM-DD",
    mileTotal: 20,
  },
  {
    dateTitle: "YYYY-MM-DD",
    mileTotal: 30,
  }
]

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center gap-10 pt-8'>
      <div className="flex gap-16">
        <Link href="/dashboard/scheduleTraining">
          <div className="text-center hover:bg-slate-100" id="dashboardCalendar">
            <h2 className="m-1 font-bold text-lg">Schedule Weeks Training</h2>
              <FullCalendar
              plugins={[ dayGridPlugin ]}
              initialView="dayGridWeek"
              headerToolbar={false}
            />
            
          </div>
        </Link>
        <Link href="/dashboard/trainingCalendar">
          <div className="text-center hover:bg-slate-100" id="dashboardCalendar">
            <h2 className="m-1 font-bold text-lg">View Training Calendar</h2>
              <FullCalendar
              plugins={[ dayGridPlugin ]}
              initialView="dayGridMonth"
              headerToolbar={false}
            />
          </div>
        </Link>
      </div>
      <Link href="/dashboard/trainingGraph">
        <div className="text-center hover:bg-slate-100" id="dashboardCalendar">
            <h2 className="m-1 font-bold text-lg">View Training Graph</h2>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={exampleData} barCategoryGap="1%">
              <XAxis dataKey="dateTitle"/>
              <YAxis />
              <Bar dataKey="mileTotal" fill="green"></Bar>
            </BarChart >
            </ResponsiveContainer>
        </div>
      </Link>
    </div>
  );
}
