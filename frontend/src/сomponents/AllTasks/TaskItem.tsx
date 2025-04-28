import React, { useState } from 'react';
import { FiCheck, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { Task } from '../types/task';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, updates: Partial<Task>) => void;
}

const TaskItem = ({ task, onToggle, onDelete, onEdit }: TaskItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState<Partial<Task>>(task);

    const handleSave = () => {
        onEdit(task.id, {
            title: editedTask.title,
            description: editedTask.description,
            dueDate: editedTask.dueDate
        });
        setIsEditing(false);
    };

    return (
        <div className="p-4 rounded-lg shadow-sm" style={{ backgroundColor: '#006D77' }}>
            {isEditing ? (
                <div className="space-y-3">
                    <input
                        type="text"
                        value={editedTask.title || ''}
                        onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                        className="w-full p-2 rounded"
                        style={{ backgroundColor: '#FFDDD2' }}
                    />
                    <textarea
                        value={editedTask.description || ''}
                        onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                        className="w-full p-2 rounded"
                        style={{ backgroundColor: '#FFDDD2' }}
                    />
                    <input
                        type="date"
                        value={editedTask.dueDate || ''}
                        onChange={(e) => setEditedTask({...editedTask, dueDate: e.target.value})}
                        className="w-full p-2 rounded"
                        style={{ backgroundColor: '#FFDDD2' }}
                    />
                    <div className="flex space-x-2">
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 rounded"
                            style={{ backgroundColor: '#FFDDD2', color: '#006D77' }}
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 rounded"
                            style={{ backgroundColor: '#FFDDD2', color: '#006D77' }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-start justify-between">
                    <div className="flex items-start">
                        <button
                            onClick={() => onToggle(task.id)}
                            className="p-1 rounded-full mr-3"
                            style={{ color: task.completed ? '#4CAF50' : '#FFDDD2' }}
                        >
                            <FiCheck className="text-xl" />
                        </button>
                        <div>
                            <h3
                                className="font-medium"
                                style={{
                                    color: '#FFDDD2',
                                    textDecoration: task.completed ? 'line-through' : 'none'
                                }}
                            >
                                {task.title}
                            </h3>
                            <p className="text-sm mt-1" style={{ color: '#E2F1F1' }}>
                                {task.description}
                            </p>
                            {task.dueDate && (
                                <p className="text-xs mt-2" style={{ color: '#B8E0E0' }}>
                                    Due: {new Date(task.dueDate).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-1 hover:text-blue-500"
                            style={{ color: '#FFDDD2' }}
                        >
                            <FiEdit2 />
                        </button>
                        <button
                            onClick={() => onDelete(task.id)}
                            className="p-1 hover:text-red-500"
                            style={{ color: '#FFDDD2' }}
                        >
                            <FiTrash2 />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
