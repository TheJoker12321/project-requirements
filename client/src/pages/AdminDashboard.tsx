import { useNavigate } from "react-router-dom"

function AdminDashboard() {

    const navigate = useNavigate()

    function moveToAdminPages(clickEvent: string) :void {

        if (clickEvent === 'create') {

            navigate('/admin/createUsers')

        } else {

            navigate('/admin/searchReports')
        }
    }

  return (
    <div className="agent-comp">
        <div className="buttons-for-choose">
            <button className="agent-choose" id="create"onClick={(e: React.MouseEvent<HTMLButtonElement>) => moveToAdminPages(e.currentTarget.id)}>Create And Show Users</button>
            <button className="agent-choose" id="search" onClick={(e: React.MouseEvent<HTMLButtonElement>) => moveToAdminPages(e.currentTarget.id)}>Search Reports By Urgency, Agent or Category</button>
        </div>
    </div>
  )
}

export default AdminDashboard