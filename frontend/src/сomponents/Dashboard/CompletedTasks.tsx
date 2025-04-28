import TaskGrid from '../CompletedTasks/TaskGrid';
import { Task } from '../types/task';

interface CompletedTasksProps {
    tasks: Task[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const CompletedTasks = ({ tasks, onToggle, onDelete }: CompletedTasksProps) => {
    return (
        <>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#006D77' }}>
                Completed Tasks
            </h3>
            <TaskGrid
                tasks={tasks}
                onToggle={onToggle}
                onDelete={onDelete}
            />
        </>
    );
};

export default CompletedTasks;