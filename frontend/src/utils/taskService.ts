const API_URL = ' http://localhost:3000/api';

export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate?: string;
    createdAt?: string;
    deleted?: boolean;
    order?: number;
}

export const fetchTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${API_URL}/tasks`);
    return await response.json();
};

export const fetchCompletedTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${API_URL}/tasks/completed`);
    return await response.json();
};

export const fetchActiveTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${API_URL}/tasks/not-completed`);
    return await response.json();
};

export const fetchDeletedTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${API_URL}/tasks/deleted`);
    return await response.json();
};

export const createTask = async (task: {
    deleted: boolean;
    dueDate: string | undefined;
    description?: string;
    completed: boolean;
    title: string;
    priority?: "low" | "medium" | "high";
    startDate: string | undefined;
    order?: number
}): Promise<Task> => {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return await response.json();
};

export const toggleTaskCompletion = async (id: string): Promise<Task> => {
    const response = await fetch(`${API_URL}/tasks/${id}/status`, {
        method: 'PATCH',
    });
    return await response.json();
};

export const deleteTask = async (id: string): Promise<Task> => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
};

export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return await response.json();
};

export const updateTasksOrder = async (ids: string[]): Promise<Task[]> => {
    const response = await fetch(`${API_URL}/tasks/order`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }),
    });
    return await response.json();
};