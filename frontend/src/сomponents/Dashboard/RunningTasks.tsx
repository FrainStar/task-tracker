import TaskCard from '../common/TaskCard';
import { Task } from '../types/task';

interface RunningTasksProps {
    tasks: Task[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const RunningTasks = ({ tasks, onToggle, onDelete }: RunningTasksProps) => {
    return (
        <>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#006D77' }}>
                Running Tasks
            </h3>
            <div className="space-y-4">
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </>
    );
};

export default RunningTasks;