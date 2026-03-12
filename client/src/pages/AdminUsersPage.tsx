import axios from "axios"
import { useState } from "react"

export type UserRes = {

    user: {
            id: string ,
            agentCode: string,
            fullName: string,
            role: string,
            initialPasswordHint: string
    }
}

export type UserPost = {

    agentCode: string,
    password: string | null,
    fullName: string,
    role: string,
}

function AdminUsersPage() {

    const [agentCode, setAgentCode] = useState<string>('')
    const [pass, setPass] = useState<string | null>(null)
    const [fullName, setFullName] = useState<string>('')
    const [role, setRole] = useState<string>('')
    const [flag, setFlag] = useState<boolean>(false)

    async function createUser(e: React.MouseEvent<HTMLButtonElement>) {

        e.preventDefault()



        const token = localStorage.getItem('token')

        const user: UserPost = {

            agentCode,
            password: pass,
            fullName,
            role
        }
        const { data } = await axios.post<UserRes | Error>('http://localhost:3003/admin/users', user,{

              headers: {Authorization: `Bearer ${token}`}

        })

        if ("error" in data) {

            console.error(data.error)

        } else {

            setFlag(true)
        }


    }

  return (
    <div>
        <form>
            <h1>Create User</h1>
            <div>
                <label htmlFor="create-agent-code">Agent Code: </label>
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgentCode(e.target.value)} type="text" id="create-agent-code" placeholder="A-100" required/>
            </div>
            <div>
                <label htmlFor="create-pass">Password (not required): </label>
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPass(e.target.value)} type="password" placeholder="*****" id="create-pass"/>
            </div>
            <div>
                <label htmlFor="full-name">Full Name</label>
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)} type="text" placeholder="John Doe" id="full-name" required/>
            </div>
            <div>
                <select value={role} id="role" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}>
                    <option style={{display: 'none'}}></option>
                    <option value="admin">Admin</option>
                    <option value="agent">Agent</option>
                </select>
            </div>
            <div>
                <button onClick={(e) => createUser(e)}>Create</button>
            </div>
        </form>
        <div>{flag && 'user created successfully'}</div>
    </div>
  )
}

export default AdminUsersPage