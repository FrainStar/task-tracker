import { useState, useEffect } from 'react';
import { Task } from '../сomponents/types/task';
import * as taskService from '../utils/taskService';

/**
 * Custom hook for managing tasks
 * @returns {Object} Task management utilities and state
 * @property {Task[]} tasks - List of tasks
 * @property {boolean} loading - Loading state
 * @property {string | null} error - Error message
 * @property {Function} addTask - Add new task
 * @property {Function} toggleTask - Toggle task completion status
 * @property {Function} removeTask - Delete task
 * @property {Function} editTask - Update task
 * @property {Function} refreshTasks - Reload tasks from server
 */
const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Load tasks from server
     * @async
     */
    const loadTasks = async () => {
        try {
            setLoading(true);
            const fetchedTasks = await taskService.fetchTasks();
            setTasks(fetchedTasks);
            setError(null);
        } catch (err) {
            setError('Failed to load tasks');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Add new task
     * @async
     * @param {Omit<Task, 'id'>} taskData - Task data without id
     * @throws {Error} When API request fails
     */
    const addTask = async (taskData: Omit<Task, 'id'>) => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const newTask = await taskService.createTask(taskData);
            setTasks(prev => [...prev, newTask]);
        } catch (err) {
            console.error('Error adding task:', err);
            throw err;
        }
    };

    /**
     * Toggle task completion status
     * @async
     * @param {string} id - Task ID
     * @throws {Error} When API request fails
     */
    const toggleTask = async (id: string) => {
        try {
            const updatedTask = await taskService.toggleTaskCompletion(id);
            setTasks(prev => prev.map(task =>
                task.id === id ? updatedTask : task
            ));
        } catch (err) {
            console.error('Error toggling task:', err);
            throw err;
        }
    };

    /**
     * Delete task
     * @async
     * @param {string} id - Task ID
     * @throws {Error} When API request fails
     */
    const removeTask = async (id: string) => {
        try {
            await taskService.deleteTask(id);
            setTasks(prev => prev.filter(task => task.id !== id));
        } catch (err) {
            console.error('Error deleting task:', err);
            throw err;
        }
    };

    /**
     * Update task
     * @async
     * @param {string} id - Task ID
     * @param {Partial<Task>} updates - Task fields to update
     * @throws {Error} When API request fails
     */
    const editTask = async (id: string, updates: Partial<Task>) => {
        try {
            const updatedTask = await taskService.updateTask(id, updates);
            setTasks(prev => prev.map(task =>
                task.id === id ? updatedTask : task
            ));
        } catch (err) {
            console.error('Error updating task:', err);
            throw err;
        }
    };

    // Load tasks on component mount
    useEffect(() => {
        loadTasks();
    }, []);

    return {
        tasks,
        loading,
        error,
        addTask,
        toggleTask,
        removeTask,
        editTask,
        refreshTasks: loadTasks,
    };
};

export default useTasks;