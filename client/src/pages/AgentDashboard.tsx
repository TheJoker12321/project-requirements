import { useNavigate } from "react-router-dom"

function AgentDashboard() {

    const navigate = useNavigate()

    function moveToPages(clickEvent: string) :void {        

        if (clickEvent === 'send') {

            navigate('/agent/sendReports')
        
        } else if (clickEvent === 'send-csv') {

            navigate('/agent/addCSV')

        } else {

            navigate('/agent/showReports')
        }
    
    }

  return (
    <div className="agent-comp">
        <div className="buttons-for-choose">
            <button className="agent-choose" id="send" onClick={(e: React.MouseEvent<HTMLButtonElement>) => moveToPages(e.currentTarget.id)}>Send Report</button>
            <button className="agent-choose" id="send-csv" onClick={(e: React.MouseEvent<HTMLButtonElement>) => moveToPages(e.currentTarget.id)}>Add a lot of Reports By CSV File</button>
            <button className="agent-choose" id="show" onClick={(e: React.MouseEvent<HTMLButtonElement>) => moveToPages(e.currentTarget.id)}>Show The Reports</button>
        </div>
    </div>
  )
}

export default AgentDashboard