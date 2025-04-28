import React, { useState } from 'react';
import TaskSearch from './TaskSearch';
import TaskItem from './TaskItem';
import useTasks from '../../hooks/useTasks';
import { Task } from '../types/task';

// Приоритеты для сортировки
const priorityOrder = {
    'high': 3,
    'medium': 2,
    'low': 1,
    'none': 0
};

const AllTasks = () => {
    const { tasks, loading, toggleTask, removeTask, editTask } = useTasks();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortBy, setSortBy] = useState<'priority' | 'date'>('priority'); // Новое состояние для выбора типа сортировки

    const handleToggleTask = async (id: string) => {
        await toggleTask(id);
    };

    const handleDeleteTask = async (id: string) => {
        await removeTask(id);
    };

    const handleEditTask = async (id: string, updates: Partial<Task>) => {
        await editTask(id, updates);
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;

    const filteredTasks = tasks
        .filter(task =>
            !task.deleted &&
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'priority') {
                // Сортировка по приоритету
                const aPriority = priorityOrder[a.priority || 'none'];
                const bPriority = priorityOrder[b.priority || 'none'];
                return sortOrder === 'asc'
                    ? aPriority - bPriority
                    : bPriority - aPriority;
            } else {
                // Сортировка по дате (по умолчанию)
                const aDate = new Date(a.dueDate || 0).getTime();
                const bDate = new Date(b.dueDate || 0).getTime();
                return sortOrder === 'asc' ? aDate - bDate : bDate - aDate;
            }
        });

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    All Tasks
                </h2>
                <TaskSearch
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    sortOrder={sortOrder}
                    onSortChange={setSortOrder}
                    sortBy={sortBy}
                    onSortByChange={setSortBy}
                />
            </div>

            <div className="space-y-4">
                {filteredTasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={handleToggleTask}
                        onDelete={handleDeleteTask}
                        onEdit={handleEditTask}
                    />
                ))}
            </div>
        </div>
    );
};

export default AllTasks;