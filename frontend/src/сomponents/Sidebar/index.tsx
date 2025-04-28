'use client'

import { FiHome, FiList, FiCheckCircle, FiPlus } from 'react-icons/fi'


/**
 * The type of view that can be selected in the sidebar
 * @typedef {'dashboard' | 'all' | 'completed' | 'add'} ViewType
 */
type ViewType = 'dashboard' | 'all' | 'completed' | 'add'


/**
 * Interface for the Sidebar component props
 * @interface SidebarProps
 * @property {boolean} isOpen - Determines whether the sidebar is open or closed
 * @property {function} onViewChange - Callback function invoked when a view is selected
 * @param {ViewType} view - The selected view type
 */
interface SidebarProps {
    isOpen: boolean
    onViewChange: (view: ViewType) => void
}


/**
 * A sidebar navigation component that allows users to switch between different views
 * @param {SidebarProps} props - The props for the Sidebar component
 * @param {boolean} props.isOpen - Controls the visibility of the sidebar
 * @param {function} props.onViewChange - Callback function for view selection
 * @returns {JSX.Element} The rendered Sidebar component
 */
const Sidebar = ({ isOpen, onViewChange }: SidebarProps) => {
    return (
        <aside className={`fixed top-16 left-0 bottom-0 w-64 bg-[#006D77] shadow-lg transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-10`}>
            <nav className="p-4">
                <ul className="space-y-2">
                    {[
                        { icon: <FiHome />, text: 'Dashboard', view: 'dashboard' },
                        { icon: <FiList />, text: 'All Tasks', view: 'all' },
                        { icon: <FiCheckCircle />, text: 'Completed Tasks', view: 'completed' },
                        { icon: <FiPlus />, text: 'Add A Task', view: 'add' },
                    ].map((item) => (
                        <li key={item.view}>
                            <button
                                onClick={() => onViewChange(item.view as ViewType)}
                                className="flex items-center w-full px-4 py-3 rounded-lg text-[#FFDDD2] hover:bg-[#005f69] transition-colors"
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.text}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar