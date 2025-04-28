'use client'

import { useState } from 'react'
import Header from '../сomponents/Header/index'
import Sidebar from '../сomponents/Sidebar/index'
import Dashboard from '../сomponents/Dashboard'
import AllTasks from '../сomponents/AllTasks'
import CompletedTasks from '../сomponents/CompletedTasks'
import AddTask from '../сomponents/AddTasks'
import { useTheme } from '../context/ThemeContext'
import useTasks from '../hooks/useTasks'
import { Task } from '../сomponents/types/task'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';

/**
 * Type definition for view options
 * @typedef {'dashboard' | 'all' | 'completed' | 'add'} ViewType
 */
type ViewType = 'dashboard' | 'all' | 'completed' | 'add'

/**
 * Main application component
 * @returns {JSX.Element} The Home component with all application layout
 */
const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [currentView, setCurrentView] = useState<ViewType>('dashboard')
    const { darkMode } = useTheme()
    const { tasks, loading, toggleTask, removeTask } = useTasks()

    /**
     * Toggles task completion status
     * @async
     * @param {string} id - Task ID to toggle
     */
    const handleToggleTask = async (id: string) => {
        await toggleTask(id)
    }

    /**
     * Deletes a task
     * @async
     * @param {string} id - Task ID to delete
     */
    const handleDeleteTask = async (id: string) => {
        await removeTask(id)
    }

    /**
     * Toggles sidebar visibility
     */
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen) // Toggle function
    }

    /**
     * Renders the current view based on state
     * @returns {JSX.Element} The appropriate view component
     */
    const renderView = () => {
        if (loading) return <div className="text-center py-8">Loading...</div>

        const completedTasks = tasks.filter((task: Task) => task.completed && !task.deleted)

        switch (currentView) {
            case 'dashboard':
                return <Dashboard/>
            case 'all':
                return <AllTasks/>
            case 'completed':
                return (
                    <CompletedTasks
                        tasks={completedTasks}
                        onToggle={handleToggleTask}
                        onDelete={handleDeleteTask}
                    />
                )
            case 'add':
                return <AddTask />
            default:
                return null
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
                <Header toggleSidebar={toggleSidebar} />

                <Sidebar
                    isOpen={sidebarOpen}
                    onViewChange={(view: ViewType) => setCurrentView(view)}
                />

                <main className="mt-16 ml-0 md:ml-64 transition-all duration-300">
                    {renderView()}
                </main>
            </div>
        </DndProvider>

    )
}

export default Home