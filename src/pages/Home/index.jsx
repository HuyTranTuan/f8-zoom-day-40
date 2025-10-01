import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import types from './Home.module.scss';

function Home() {
    return (
        <div className={types.wrapper}>
            <Header />
            <Outlet />
        </div>
    )
}

export default Home;