
/**
 * API base URL
 * @constant {string}
 */
const API_URL = ' http://localhost:3000/api';

/**
 * Task interface
 * @interface
 * @property {string} id - Unique identifier
 * @property {string} title - Task title
 * @property {string} description - Task description
 * @property {boolean} completed - Completion status
 * @property {string} [dueDate] - Optional due date
 * @property {string} [createdAt] - Creation timestamp
 * @property {boolean} [deleted] - Soft delete flag
 * @property {number} [order] - Sort order
 */
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

/**
 * Fetches all tasks
 * @returns {Promise<Task[]>} Array of tasks
 */
export const fetchTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${API_URL}/tasks`);
    return await response.json();
};

/**
 * Fetches completed tasks
 * @returns {Promise<Task[]>} Array of completed tasks
 */
export const fetchCompletedTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${API_URL}/tasks/completed`);
    return await response.json();
};

/**
 * Fetches active tasks
 * @returns {Promise<Task[]>} Array of incomplete tasks
 */
export const fetchActiveTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${API_URL}/tasks/not-completed`);
    return await response.json();
};

/**
 * Creates new task
 * @returns {Promise<Task>} Created task
 */
export const fetchDeletedTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${API_URL}/tasks/deleted`);
    return await response.json();
};

/**
 * Toggles task completion status
 * @returns {Promise<Task>} Updated task
 * @param task
 */
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

/**
 * Updates task order
 * @returns {Promise<Task[]>} Updated tasks
 * @param id
 */
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