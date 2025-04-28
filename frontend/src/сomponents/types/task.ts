// types/task.ts
export interface Task {
    id: string
    title: string
    description?: string
    startDate?: string
    dueDate?: string
    completed: boolean
    priority?: 'low' | 'medium' | 'high'
    order?: number
    deleted?: boolean
}