import axios from "axios";

type UserRes = {

    id: string,
    agentCode: string,
    fullName: string,
    role: 'admin' | 'agent'

}

export type Response = {

    token: string,
    user: UserRes

}

export async function getLogin(agentCode: string, password: string) :Promise<Response> {

    const { data } = await axios.post<Response>('http://localhost:3003/auth/login', {

        agentCode,
        password

    })

    return data
}