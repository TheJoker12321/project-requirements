import { useState } from "react"
import type { Category, Report, Urgency } from "../types/types.ts"
import axios from "axios"

type ResUser = {
                id: string,
                userId: string,
                category: Category,
                urgency: Urgency,
                message: string,
                imagePath: string,
                sourceType: string,
                createdAt: string,
}

type Error = {

    error: string
}
function SendReport() {

    const [image, setImage] = useState<File | null>(null)
    const [category, setCategory] = useState<Category | null>(null)
    const [urgency, setUrgency] = useState<Urgency | null>(null)
    const [message, setMessage] = useState<string>('')
    const [flag, setFlag] = useState<boolean | null>(null)

    function createImage(e: React.ChangeEvent<HTMLInputElement>) :void {

        if (e.target.files) {

            setImage(e.target.files[0])

        }

    }

    async function submitReport(e: React.MouseEvent<HTMLButtonElement>) {

        e.preventDefault()

        const report: Report = {

            category: category as Category,
            urgency: urgency as Urgency,
            message

        }
        const token = localStorage.getItem('token')

        if (image) {
            const formData = new FormData()
            formData.append('image', image)
            formData.append('report', JSON.stringify(report))

            const { data } = await axios.post<ResUser | Error>('http://localhost:3003/reports', formData, {

                headers: {Authorization: `Bearer ${token}`}
            })

            if ("error" in data) {

                setFlag(false)
                console.error(data.error)

            } else {

                setFlag(true)

            }
        }

    }
  
    return (
    <div>
        <form>
            <div>
                <label htmlFor="category">Select Category: </label>
                <select value={category ?? ''} id="category" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value as Category)} required>
                    <option style={{display: "none"}}></option>
                    <option value="maintenance">Maintenance</option>
                    <option value="safety">Safety</option>
                    <option value="security">Security</option>
                </select>
            </div>

            <div>
                <label htmlFor="urgency">Select Urgency: </label>
                <select value={urgency ?? ''} id="urgency" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUrgency(e.target.value as Urgency)} required>
                    <option style={{display: "none"}}></option>
                    <option value="extream">Extream</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>

            <div>
                <label htmlFor="message">Message</label>
                <textarea value={message} id="message" rows={3} placeholder="Your message...." onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} required></textarea>
            </div>

            <div>
                <input type="file" accept="image/*" onChange={(e) => createImage(e)}/>
            </div>

            <div>
                <button type="submit" onClick={(e) => submitReport(e)}>Submit</button>
            </div>
        </form>
        <div className={flag && 'created' || 'error'}>{flag && 'user created successfully' || 'Error'}</div>
    </div>
  )
}

export {SendReport, type Error, type ResUser }