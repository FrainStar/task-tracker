import { FiSearch, FiArrowUp, FiArrowDown } from 'react-icons/fi';

interface TaskSearchProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    sortOrder: 'asc' | 'desc';
    onSortChange: (order: 'asc' | 'desc') => void;
    sortBy: 'priority' | 'date';
    onSortByChange: (by: 'priority' | 'date') => void;
}

const TaskSearch = ({
                        searchQuery,
                        onSearchChange,
                        sortOrder,
                        onSortChange,
                        sortBy,
                        onSortByChange
                    }: TaskSearchProps) => {
    return (
        <div className="flex items-center space-x-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full py-2 px-4 pl-10 rounded border focus:outline-none"
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            <select
                value={sortBy}
                onChange={(e) => onSortByChange(e.target.value as 'priority' | 'date')}
                className="py-2 px-3 rounded border"
            >
                <option value="priority">Priority</option>
                <option value="date">Date</option>
            </select>

            <button
                onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 rounded-full hover:bg-gray-100"
            >
                {sortOrder === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
            </button>
        </div>
    );
};

export default TaskSearch;