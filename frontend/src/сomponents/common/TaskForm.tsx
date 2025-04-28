// TaskForm.tsx
'use client';
import { useState } from 'react';
import { Task } from '../types/task';
import { format, parseISO } from 'date-fns';

interface TaskFormProps {
    onSubmit: (task: Omit<Task, 'id'>) => void;
}

const TaskForm = ({ onSubmit }: TaskFormProps) => {
    const [formData, setFormData] = useState<Omit<Task, 'id'>>({
        title: '',
        description: '',
        startDate: '',
        dueDate: '',
        priority: 'medium',
        completed: false,
        order: 0
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (formData.dueDate && formData.startDate) {
            const start = new Date(formData.startDate);
            const due = new Date(formData.dueDate);

            if (start > due) {
                newErrors.dueDate = 'Due date must be after start date';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (name: 'startDate' | 'dueDate', value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value ? format(parseISO(value), 'yyyy-MM-dd') : ''
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        onSubmit({
            ...formData,
            startDate: formData.startDate || undefined,
            dueDate: formData.dueDate || undefined
        });

        // Reset form
        setFormData({
            title: '',
            description: '',
            startDate: '',
            dueDate: '',
            priority: 'medium',
            completed: false,
            order: 0
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
            {/* Title Field */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title*
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter task title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[#006D77] focus:border-[#006D77] ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
            </div>

            {/* Description Field */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Enter task description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#006D77] focus:border-[#006D77]"
                />
            </div>

            {/* Date Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Date */}
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                    </label>
                    <input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleDateChange('startDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#006D77] focus:border-[#006D77]"
                    />
                </div>

                {/* Due Date */}
                <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date
                    </label>
                    <input
                        id="dueDate"
                        name="dueDate"
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => handleDateChange('dueDate', e.target.value)}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[#006D77] focus:border-[#006D77] ${
                            errors.dueDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        min={formData.startDate}
                    />
                    {errors.dueDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
                    )}
                </div>
            </div>

            {/* Priority Field */}
            <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                </label>
                <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#006D77] focus:border-[#006D77]"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    className="px-6 py-2 bg-[#006D77] text-white rounded-md hover:bg-[#005f69] transition-colors focus:outline-none focus:ring-2 focus:ring-[#006D77] focus:ring-offset-2"
                >
                    Add Task
                </button>
            </div>
        </form>
    );
};

export default TaskForm;