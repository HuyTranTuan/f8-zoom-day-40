import { Routes, Route, HashRouter } from 'react-router-dom';
import EditTask from '@/pages/EditTask';
import NewTask from '@/pages/NewTask';
import TaskList from '@/pages/TaskList';
import Home from '../../pages/Home';

function AppRoutes() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="" element={<TaskList />} />
                    <Route path="new-task" element={<NewTask />} />
                    <Route path=":id/edit" element={<EditTask />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default AppRoutes;