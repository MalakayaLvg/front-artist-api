import { Outlet } from 'react-router-dom';
import HomeButton from "./components/HomeButton.jsx";
import './App.css';

function App() {
    return (
        <div className="app-container">
            <HomeButton />
            <Outlet />
        </div>
    );
}

export default App;