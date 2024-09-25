'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { GET_USERMILES } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { useEffect, useRef } from 'react'

export default function TrainingCalendar({session}:any) {
  const calendarRef = useRef<any>(null)
  const { data: userMilesData, loading: userMilesLoading, error: userMilesError } = useQuery(GET_USERMILES, {
    variables: {userMilesId: session.user.id}
  });

  useEffect(() => {
    // TODO: possibly implement method to individually remove/update/add events for better efficiency
    if(userMilesData) {
      const calendarApi = calendarRef.current?.getApi()
      calendarApi.removeAllEvents()
      for(let item of userMilesData.userMiles) {
        calendarApi.addEvent({
          id: item.date,
          title: item.miles,
          start: item.date,
          backgroundColor: item.completed ? "green" : "red",
          borderColor: item.completed ? "green" : "red",
        })
      }
    }
  }, [userMilesData])

  return (
    <div className='relative'>
      <FullCalendar
        ref={calendarRef}
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
      />
      {userMilesLoading && <div className="z-50 bg-white w-full h-full absolute top-0 right-0 opacity-50"></div>}
    </div>
  )
}