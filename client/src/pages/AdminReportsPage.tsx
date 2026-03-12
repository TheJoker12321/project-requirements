import { useState } from "react"
import type { Category, Urgency } from "../types/types"
import type { DataReports } from "../component/ShowReports"
import axios from "axios"
import type { ResUser } from "../component/SendReport"

function AdminReportsPage() {

    const [agentCode, setAgentCode] = useState<string>('')
    const [urgency, setUrgency] = useState<Urgency | null>(null)
    const [category, setCategory] = useState<Category | null>(null)
    const [dataReports, setDataReports] = useState<ResUser[]>([])
    
    async function searching() {

        if (!category && !urgency && !agentCode) return;
        try {
            const token = localStorage.getItem('token')
            const { data } = await axios.get<DataReports>('http://localhost:3003/reports',{ 

                headers: {Authorization: `Bearer ${token}`},
                params: {

                    agentCode: agentCode || undefined,
                    urgency,
                    category
                }

            }
        )
        
        setDataReports(data.reports)
    } catch(err) {

        console.error(err);
        
    }

}

  return (
    <div>
        <h1>Searching By.....</h1>
        <div>
            <label htmlFor="categorySearch">Select Category: </label>
            <select value={category ?? ''} id="categorySearch" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value as Category)}>
                <option style={{display: "none"}}></option>
                <option value="maintenance">Maintenance</option>
                <option value="safety">Safety</option>
                <option value="security">Security</option>
            </select>
        </div>

        <div>
            <label htmlFor="urgencySearch">Select Urgency: </label>
            <select value={urgency ?? ''} id="urgencySearch" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUrgency(e.target.value as Urgency)}>
                <option style={{display: "none"}}></option>
                <option value="extream">Extream</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
        </div>
        <div>
            <label htmlFor="agentSearch">Agent Code: </label>
            <input type="text" id="agentSearch" placeholder="your agent code..." onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgentCode(e.target.value)}/>
        </div>
        <button onClick={searching}>Search</button>
        {Array.isArray(dataReports) && dataReports.map((reportObj, index) => {

            return (
                <div key={index}>
                    <div>{reportObj.id}</div>
                    <div>{reportObj.userId}</div>
                    <div>{reportObj.category}</div>
                    <div>{reportObj.urgency}</div>
                    <div>{reportObj.message}</div>
                    <div>{reportObj.createdAt}</div>
                    <div>
                        <img src={reportObj.imagePath} alt="" />
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default AdminReportsPage