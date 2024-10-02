'use client'
import { ADD_MILEAGE, DELETE_MILEAGE, UPDATE_MILEAGE, UPDATE_COMPLETED } from '@/graphql/mutations';
import { GET_USERMILES, GET_USERMILE } from '@/graphql/queries';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import { useEffect, useRef, useState } from 'react'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure, Input } from "@nextui-org/react";

export default function ScheduleCalendar({session}:any) {
  const calendarRef = useRef<any>(null)
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [buttonClick, setButtonClick] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [miles, setMiles] = useState('');
  const [addMileage] = useMutation(ADD_MILEAGE, {
    refetchQueries: [
      {
        query: GET_USERMILES,
        variables: {userMilesId: session.user.id}
      }
    ]
  });
  const [deleteMileage] = useMutation(DELETE_MILEAGE, {
    refetchQueries: [
      {
        query: GET_USERMILES,
        variables: {userMilesId: session.user.id}
      }
    ]
  });
  const [updateMileage] = useMutation(UPDATE_MILEAGE, {
    refetchQueries: [
      {
        query: GET_USERMILES,
        variables: {userMilesId: session.user.id}
      }
    ]
  });
  const [updateCompleted, {data: completedData, loading: loadingCompletedData}] = useMutation(UPDATE_COMPLETED, {
    refetchQueries: [
      {
        query: GET_USERMILES,
        variables: {userMilesId: session.user.id}
      }
    ]
  })
  const [userMileQuery, {data: individualMileData}] = useLazyQuery(GET_USERMILE,{
    // make refetch each time incase completed gets updated
    fetchPolicy: 'network-only',
  })
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

  useEffect(() => {
    if(individualMileData && individualMileData?.userMile.completed) {
      updateCompleted({ variables: { date: individualMileData?.userMile.date, setgoalcompleteId: session.user.id, completed: false }})
    } else if(individualMileData && !individualMileData?.userMile.completed) {
      updateCompleted({ variables: { date: individualMileData?.userMile.date, setgoalcompleteId: session.user.id, completed: true }})
    }
  },[individualMileData])

  const hasEventOnDay = (events: any, date: any) => {
    return events.some((event: any) => 
      new Date(event.start).toDateString() === new Date(date).toDateString()
    );
  };

  function handleDateSelect(selectInfo: any) {
    let calendarApi = selectInfo.view.calendar
    if (hasEventOnDay(calendarApi.getEvents(), selectInfo.start)) {
      toast('Only one goal per day is allowed.', { type: "error" });
      return;
    }
    calendarApi.unselect()
    setSelectedDate(selectInfo.startStr);
    onOpen()
  }

  async function handleDateSubmit() {
    await addMileage({ variables: { date: selectedDate, miles: miles, addmileagegoalId: session.user.id}})
    setMiles('')
  }

  function handleEventClick(clickInfo: any) {
    const calendarApi = calendarRef.current?.getApi()
    if(!buttonClick) {
      setUpdateModal(true)
      setSelectedDate(clickInfo.event.startStr);
      setMiles(clickInfo.event.title)
      onOpen()
    } else {
      let currentEvent = calendarApi.getEventById(clickInfo.event.id)
      let [eventColor, eventId, eventTitle] = [currentEvent.backgroundColor, currentEvent.id, currentEvent.title]
      // using useEffect for when userMile data received update completed 
      userMileQuery({ variables: {date: clickInfo.event.startStr, userMileId: session.user.id}})
    }
    calendarApi.unselect()
    setButtonClick(false)
  }

  function handleEventUpdate() {
    setUpdateModal(false)
    updateMileage({ variables: { date: selectedDate, updatemileagegoalId: session.user.id, miles: miles }})
    setMiles('')
  }

  function handleEventCompleted() {
    // update completed mutation called in handleEventClick
    setButtonClick(true)
  }

  async function handleEventDelete() {
    setMiles('')
    setUpdateModal(false)
    deleteMileage({ variables: { date: selectedDate, deletemileagegoalId: session.user.id }})
  }

  function renderEventContent(eventInfo: any) {
    return (
      <>
        <div className="flex justify-center">
          <div id="event-title">{eventInfo.event.title}</div>
        </div>
        <div className="flex justify-center">
          <button onClick={handleEventCompleted} type="button" className="min-w-0 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Complete
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2"xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.303 4.846l.882.882-12.22 12.452-6.115-5.93.902-.902 5.303 5.028 11.248-11.53zm-.018-2.846l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285-3.715-3.715z"/>
          </svg>
          </button>
        </div>
      </>
    );
  }

  return (
    <>
    <div className='relative'>
      <FullCalendar
        ref={calendarRef}
        selectable={true}
        plugins={[ dayGridPlugin,interactionPlugin ]}
        dayMaxEvents={1}
        eventContent={renderEventContent}
        initialView="dayGridWeek"
        select={handleDateSelect}
        eventClick={handleEventClick}
        // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
      />
      {(userMilesLoading || loadingCompletedData) && <div className="z-50 bg-white w-full h-full absolute top-0 right-0 opacity-50"></div>}
    </div>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {updateModal?
              <ModalHeader className="flex flex-col gap-1">Update MileageData For {selectedDate}</ModalHeader>
                :
              <ModalHeader className="flex flex-col gap-1">Enter Mileage Data For {selectedDate}</ModalHeader>}
              <ModalBody>
              <Input
                isRequired
                type="number"
                min={0}
                label="Mileage"
                value={miles}
                onChange={(e) => setMiles(e.target.value)}
              />
              </ModalBody>
              <div className="flex flex-row">
              <ModalFooter>
              {
              updateModal && 
              <Button color="danger" onPress={() => {
                  handleEventDelete()
                  onClose()
                }}>
                  Delete
              </Button>
              }
              </ModalFooter>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => {
                  onClose()
                  setUpdateModal(false)
                  }
                  }>
                  Close
                </Button>
                <Button color="primary" onPress={() => {
                  if(miles !== '') {
                    if(updateModal) {
                      handleEventUpdate()
                    } else {
                      handleDateSubmit()
                    }
                    onClose()
                  } else {
                    toast("Must enter a value!", { type: "error" })
                  }
                }}>
                  Submit
                </Button>
              </ModalFooter>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}