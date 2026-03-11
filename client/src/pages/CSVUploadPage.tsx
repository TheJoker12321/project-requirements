import axios from "axios"
import { useState, type ChangeEvent } from "react"
import type { ResUser } from "../component/SendReport"

function CSVUploadPage() {

    const [csv, setCSV] = useState<File | null>(null)
    const [flag, setFlag] = useState<boolean | null>(null)

    function changeCSV(e: ChangeEvent<HTMLInputElement>) {

        if (e.target.files) {

            setCSV(e.target.files[0])

        }
    }

    async function submitCSV() {

        if (csv) {

            const token = localStorage.getItem('token')
            const formData = new FormData()
            formData.append('file', csv)

            const { data } = await axios.post<ResUser | Error>('http://localhost:3003/reports/csv', formData, {

                headers: {Authorization: `Bearer ${token}`}

            })

            if ("error" in data) {

                console.error(data.error)
                setFlag(false)

            } else {

                setFlag(true)
            }


        }

    }
  return (
    <>
        <div>
            <h1>Create Report By CSV File</h1>
            <div>
                <input type="file" accept=".csv" onChange={(e) => changeCSV(e)}/>
                <button onClick={submitCSV}>Submit CSV File</button>
                <div className={flag && 'created' || 'error'}>{flag && 'uploaded csv successfully and create report' || 'Error' }</div>
            </div>
            <div>

            </div>
        </div>
    </>
  )
}

export default CSVUploadPage