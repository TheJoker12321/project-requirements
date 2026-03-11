export type Category = "maintenance" | "safety" | "security"

export type Urgency = "extream" | "high" | "medium" | "low"

export type Report = {

    category: Category,
    urgency: Urgency,
    message: string
    
}