import { useState, type ChangeEvent } from "react"
import { getLogin, type Response } from "../utils/getLogin.ts"
import { useNavigate } from "react-router-dom"


function Login() {

    const navigate = useNavigate()
    const [agentCode, setAgentCode] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    async function logInto(e :React.MouseEvent<HTMLButtonElement, MouseEvent>) :Promise<void> {

        e.preventDefault()

        const data: Response = await getLogin(agentCode, password)

        localStorage.setItem('token', data.token)
        console.log(data.user.role);
        
        if (data.user.role === 'admin') {

            navigate('/dashboard/admin')

        } else {

            navigate('/dashboard/agent')

        }
    }

  return (
    <>
        <form>
            <h1>Login</h1>
            <div className="agent-code-div">
                <label htmlFor="agentCode">Agent Code</label>
                <input onChange={(e:ChangeEvent<HTMLInputElement, HTMLInputElement>) => setAgentCode(e.target.value)} type="text" id="agentCode" placeholder="A-100"/>
            </div>
            <div className="pass-div">
                <label htmlFor="password">Password</label>
                <input onChange={(e:ChangeEvent<HTMLInputElement, HTMLInputElement>) => setPassword(e.target.value)} type="password" id="password" placeholder="****"/>
            </div>
            <div className="submit-div">
                <button type="submit" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => logInto(e)}>Submit</button>
            </div>
        </form>
    </>
  )
}

export default Login