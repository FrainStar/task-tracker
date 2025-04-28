import TaskGrid from './TaskGrid';
import { Task } from '../types/task';

interface CompletedTasksProps {
    tasks: Task[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const CompletedTasks = ({ tasks, onToggle, onDelete }: CompletedTasksProps) => {
    return (
        <div className="p-6">
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Completed Tasks
            </h3>
            <TaskGrid
                tasks={tasks}
                onToggle={onToggle}
                onDelete={onDelete}
            />
        </div>
    );
};

export default CompletedTasks;