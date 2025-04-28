// TaskGrid.tsx
import TaskCard from '../common/TaskCard'
import { Task } from '../types/task'

interface TaskGridProps {
    tasks: Task[]
    onToggle: (id: string) => void
    onDelete: (id: string) => void
    showActions?: boolean
}

const TaskGrid = ({ tasks, onToggle, onDelete, showActions = true }: TaskGridProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((task: Task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    showActions={showActions}
                />
            ))}
        </div>
    )
}

export default TaskGrid