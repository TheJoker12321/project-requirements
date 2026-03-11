import { useEffect, useState } from "react"
import type { Error, ResUser } from "./SendReport"
import axios from "axios"

function ShowReports() {

    const [dataUsers, setDataUsers] = useState<ResUser[]>([])

    useEffect(() => {
        async function getUsers() {
            const token = localStorage.getItem('token')
            const { data } = await axios.get<ResUser[] | Error>('http://localhost:3003/reports', {

                headers: {Authorization: `Bearer ${token}`}
            })

            if ('error' in data) {

                console.error(data.error);
                
            } else {

                setDataUsers(data)
            }
        }
    getUsers()
    }, [])

  return (

    <div>
        {}
    </div>
  )
}

export default ShowReports