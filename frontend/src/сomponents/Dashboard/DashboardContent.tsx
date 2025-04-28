import { useDrop } from 'react-dnd';
import RunningTasks from './RunningTasks';
import CompletedTasks from './CompletedTasks';
import useTasks from '../../hooks/useTasks';
import { useRef } from 'react';

interface DraggableItem {
    id: string;
    type: string;
}

const ItemTypes = {
    TASK: 'task',
};

const DashboardContent = () => {
    const { tasks, loading, toggleTask, removeTask } = useTasks();

    const runningRef = useRef<HTMLDivElement>(null);
    const completedRef = useRef<HTMLDivElement>(null);

    const [{ isOver: isOverRunning }, dropRunning] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item: DraggableItem) => {
            toggleTask(item.id);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const [{ isOver: isOverCompleted }, dropCompleted] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item: DraggableItem) => {
            toggleTask(item.id);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    dropRunning(runningRef);
    dropCompleted(completedRef);

    if (loading) return <div className="text-center py-8">Loading...</div>;

    const runningTasks = tasks.filter(task => !task.completed && !task.deleted);
    const completedTasks = tasks.filter(task => task.completed && !task.deleted);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

            <div className="flex flex-col md:flex-row gap-6">
                <div
                    ref={runningRef}
                    className={`flex-1 transition-colors ${isOverRunning ? 'bg-blue-50 rounded-lg' : ''}`}
                >
                    <RunningTasks
                        tasks={runningTasks}
                        onToggle={toggleTask}
                        onDelete={removeTask}
                    />
                </div>

                <div className="hidden md:block w-px bg-gray-300 mx-2"></div>

                <div
                    ref={completedRef}
                    className={`flex-1 transition-colors ${isOverCompleted ? 'bg-green-50 rounded-lg' : ''}`}
                >
                    <CompletedTasks
                        tasks={completedTasks}
                        onToggle={toggleTask}
                        onDelete={removeTask}
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;