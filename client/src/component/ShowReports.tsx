import { useEffect, useState } from "react"
import type { Error, ResUser } from "./SendReport"
import axios from "axios"

export type DataReports = {

    reports: ResUser[]
}

function ShowReports() {

    const [dataReports, setDataReports] = useState<ResUser[]>([])

    useEffect(() => {
        async function getReports() {
            const token = localStorage.getItem('token')            
            const { data } = await axios.get<DataReports | Error>('http://localhost:3003/reports', {

                headers: {Authorization: `Bearer ${token}`},
                params: {
                    category: 'safety'
                }
            })

            if ('error' in data) {

                console.error(data.error);
                
            } else {

                setDataReports(data.reports)
            }
        }
    getReports()
    
    }, [])

  return (

    <div>
        {Array.isArray(dataReports) && dataReports.map((userObj, index) => {

            return (
                <div key={index}>
                    <div>{userObj.id}</div>
                    <div>{userObj.userId}</div>
                    <div>{userObj.category}</div>
                    <div>{userObj.urgency}</div>
                    <div>{userObj.message}</div>
                    <div>{userObj.createdAt}</div>
                    <div>
                        <img src={userObj.imagePath} alt="" />
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default ShowReports