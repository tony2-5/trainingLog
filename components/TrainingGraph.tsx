'use client'
import {ResponsiveContainer, BarChart, Bar, Tooltip, YAxis, XAxis} from 'recharts'
import { GET_USERMILES_DATES } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

export default function TrainingGraph({session,daysArr,chunkedDaysArr}:any) {
  const { data: userMilesData} = useQuery(GET_USERMILES_DATES, {
    variables: {userMilesDatesId: session.user.id, dates: daysArr},
  });
  const [mileData, setMileData] = useState<any>([])
  let barChartObj: any = []
  useEffect(() => {
    // filter queried data for completed mileage days
    setMileData(userMilesData?.userMilesDates?.filter((mileData:any)=>mileData.completed))
  }, [userMilesData])

  useEffect(() => {
    // chunked array is our array of 16 weeks of days split into arrays of 7
    // initializing object to be used by chart with title, days in the week, and mile total
    for(let i=chunkedDaysArr.length-1; i>=0; i--) {
      barChartObj.push({dateTitle: `${chunkedDaysArr[i][6]} to ${chunkedDaysArr[i][0]}`, days: chunkedDaysArr[i], mileTotal: 0})
    }
    if(mileData?.length>0) {
      // once we get mile data check each of the week objects to see if our day exists. If it exists add to mileage total
      for(let i =0; i<mileData.length; i++) {
        for(let j=0; j<barChartObj.length;j++) {
          if(barChartObj[j].days.includes(mileData[i].date)) {
            barChartObj[j].mileTotal+=Number(mileData[i].miles)
          }
        }
      }
    }
  },[mileData])

  return (
    <div className="m-16">
      {mileData && <ResponsiveContainer width="100%" height={600}>
        <BarChart data={barChartObj} barCategoryGap="1%" >
      
          <XAxis 
            dataKey="dateTitle"
            interval={0}
            angle={-50}
            textAnchor="end"
            height={150}
            tick={{ dx: 25 ,fontSize: 12 }}
            style={{
              fontWeight: "500"
            }}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="mileTotal" fill="green" />
        </BarChart>
      </ResponsiveContainer>}
    </div>
  )
}