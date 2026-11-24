import type { Task } from "../entities/Task";

const API_URL = import.meta.env.VITE_API_URL;

async function ensureSuccess(response: Response): Promise<void> {
    if (!response.ok) {
        throw new Error(`A API respondeu com erro (${response.status}). Confira se o json-server está rodando.`);
    }
}

export const taskService = {
    async fetchTasks(): Promise<Task[]>{
        const response = await fetch(`${API_URL}tasks`)
        await ensureSuccess(response)
        const data: Task[] = await response.json()
        return data
    },

    async createTask(attributes: Omit<Task, "id">): Promise<Task> {
        const response = await fetch(`${API_URL}tasks`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(attributes)
        })
        await ensureSuccess(response)
        const newTask: Task = await response.json()
        return newTask
    },

    async updateTask(id: number, attributes: Partial<Omit<Task, "id">>): Promise<Task>{
        const response = await fetch(`${API_URL}tasks/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(attributes)
        })
        await ensureSuccess(response)
        const updatedTask: Task = await response.json()
        return updatedTask
    },

    async deleteTask(id: number): Promise<void>{
        const response = await fetch(`${API_URL}tasks/${id}`,{
            method: "DELETE"
        })
        await ensureSuccess(response)
    }
}
