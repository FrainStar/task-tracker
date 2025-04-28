import useTasks from '../../hooks/useTasks';
import TaskForm from '../common/TaskForm';
import { Task } from '../types/task';
import React, { useState } from 'react';
import * as taskService from "@/utils/taskService";

const AddTask = () => {
    const { loading } = useTasks();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [tasks, setTasks] = useState<Task[]>([]);

    if (loading) return <div className="text-center py-8">Loading...</div>;

    const handleAddTask = async (taskData: Omit<Task, 'id'>) => {
        await addTask(taskData);
    };

    const addTask = async (taskData: Omit<Task, 'id'>) => {
        try {
            const newTask = await taskService.createTask({
                ...taskData,
                startDate: taskData.startDate || undefined,
                dueDate: taskData.dueDate || undefined,
                completed: false,
                deleted: false
            });
            setTasks(prev => [...prev, newTask]);
        } catch (err) {
            console.error('Error adding task:', err);
            throw err;
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Add task
            </h2>

            <div className="mt-8">
                <TaskForm onSubmit={handleAddTask} />
            </div>
        </div>
    );
};

export default AddTask;