import { useDrag } from 'react-dnd';
import { FiCheck, FiTrash2 } from 'react-icons/fi';
import { Task } from '../types/task';
import { useRef } from 'react';


/**
 * Свойства компонента TaskCard
 * @typedef {Object} TaskCardProps
 * @property {Task} task - Объект задачи для отображения
 * @property {Function} [onToggle] - Функция обратного вызова при переключении статуса задачи
 * @property {Function} [onDelete] - Функция обратного вызова при удалении задачи
 * @property {boolean} [showActions=true] - Флаг отображения кнопок действий
 */
interface TaskCardProps {
    task: Task;
    onToggle?: (id: string) => void;
    onDelete?: (id: string) => void;
    showActions?: boolean;
}

/**
 * Компонент карточки задачи с поддержкой Drag and Drop
 * @param {TaskCardProps} props - Свойства компонента
 * @returns {JSX.Element} Отрисованный компонент карточки задачи
 */
const TaskCard = ({ task, onToggle, onDelete, showActions = true }: TaskCardProps) => {
    /**
     * Настройка drag-поведения для задачи
     * @type {[Object, Function]}
     */
    const cardRef = useRef<HTMLDivElement>(null);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    drag(cardRef);
    /**
     * Обрабатывает переключение статуса задачи
     * @function handleToggle
     */
    const handleToggle = () => onToggle?.(task.id);

    /**
     * Обрабатывает удаление задачи
     * @function handleDelete
     */
    const handleDelete = () => onDelete?.(task.id);

    return (
        <div
            ref={cardRef}
            className={`bg-white rounded-lg shadow p-4 mb-3 border border-gray-200 cursor-move transition-opacity ${
                isDragging ? 'opacity-50' : 'opacity-100'
            }`}
            style={{ backgroundColor: '#006D77' }}
            role="button"
            aria-label={`Task: ${task.title}`}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1" style={{ color: '#FFDDD2' }}>
                        {task.title}
                    </h3>

                    <div className="text-sm mb-2" style={{ color: '#FFDDD2' }}>
                        <p>Start date: {task.startDate || 'Not specified'}</p>
                    </div>

                    {task.dueDate && (
                        <div className="text-xs mb-3" style={{ color: '#FFDDD2' }}>
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                    )}

                    {showActions && (
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleToggle}
                                className={`px-3 py-1 text-sm rounded-md ${
                                    task.completed
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-blue-100 text-blue-800'
                                }`}
                                style={{ backgroundColor: '#FFDDD2' }}
                                aria-label={task.completed ? 'Mark as incomplete' : 'Mark as completed'}
                            >
                                {task.completed ? 'Completed' : 'Mark as completed'}
                            </button>

                            {onDelete && (
                                <button
                                    onClick={handleDelete}
                                    className="p-1 text-gray-500 hover:text-red-500"
                                    style={{ backgroundColor: '#FFDDD2' }}
                                    aria-label="Delete task"
                                >
                                    <FiTrash2 size={16} />
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {task.completed && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <FiCheck className="mr-1" size={12} />
                        Done
                    </span>
                )}
            </div>
        </div>
    );
};

export default TaskCard;