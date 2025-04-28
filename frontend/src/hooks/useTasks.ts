import { useState, useEffect } from 'react';
import { Task } from '../сomponents/types/task';
import * as taskService from '../utils/taskService';

const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    const addTask = async (taskData: Omit<Task, 'id'>) => {
        try {
            const newTask = await taskService.createTask(taskData);
            setTasks(prev => [...prev, newTask]);
        } catch (err) {
            console.error('Error adding task:', err);
            throw err;
        }
    };

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

    const removeTask = async (id: string) => {
        try {
            await taskService.deleteTask(id);
            setTasks(prev => prev.filter(task => task.id !== id));
        } catch (err) {
            console.error('Error deleting task:', err);
            throw err;
        }
    };

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