import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import dynamic from 'next/dynamic';

const DashboardContent = dynamic(() => import('./DashboardContent'), {
    ssr: false,
    loading: () => <div>Loading...</div>,
});

const Dashboard = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <DashboardContent />
        </DndProvider>
    );
};

export default Dashboard;
