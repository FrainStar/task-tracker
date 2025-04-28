import { FiMenu, FiSearch, FiBell, FiSun, FiMoon, FiUser } from 'react-icons/fi';
import { useTheme } from '@/context/ThemeContext';


/**
 * Interface for the Header component props
 * @interface HeaderProps
 * @property {function} toggleSidebar - Callback function to toggle sidebar visibility
 */
interface HeaderProps {
    toggleSidebar: () => void;
}

/**
 * A header component containing navigation controls, search, and user actions
 * @param {HeaderProps} props - The props for the Header component
 * @param {function} props.toggleSidebar - Function to toggle the sidebar open/close state
 * @returns {JSX.Element} The rendered Header component
 *
 * @example
 * <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
 */
const Header = ({ toggleSidebar }: HeaderProps) => {

    /**
     * Theme context hook for dark mode functionality
     * @type {object}
     * @property {boolean} darkMode - Current dark mode state
     * @property {function} toggleTheme - Function to toggle between dark/light theme
     */
    const { darkMode, toggleTheme } = useTheme();

    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10"
                style={{ backgroundColor: '#83C5BE' }}>
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <button
                    onClick={toggleSidebar}  // Add onClick handler here
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    style={{ color: '#006D77' }}
                >
                    <FiMenu className="text-xl" />
                </button>

                {/* Rest of your header code remains the same */}
                <div className="flex-1 max-w-md mx-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="w-full py-2 px-4 pl-10 focus:outline-none"
                            style={{
                                backgroundColor: '#FFDDD2',
                                color: 'var(--text-primary)',
                                border: '1px solid var(--border)'
                            }}
                        />
                        <FiSearch
                            className="absolute left-3 top-3"
                            style={{ color: 'var(--text-secondary)' }}
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                        <FiBell style={{ color: 'var(--text-primary)' }} />
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full"
                              style={{ backgroundColor: '#006D77' }}></span>
                    </button>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        style={{ color: '#006D77' }}
                    >
                        {darkMode ? <FiSun /> : <FiMoon />}
                    </button>

                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <FiUser style={{ color: '#006D77' }} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;