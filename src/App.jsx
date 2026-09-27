import { useState } from 'react';
import LoginForm from './components/LoginForm';
import ProjectList from './components/ProjectList';
import AddProjectForm from './components/AddProjectForm';
import LogoutButton from './components/LogoutButton';

export default function App() {
    const [loggedIn, setLoggedIn] = useState(
        !!localStorage.getItem('token')
    );

    const [refreshKey, setRefreshKey] = useState(0);

    function handleLogin() {
        setLoggedIn(true);
    }

    function handleLogout() {
        setLoggedIn(false);
    }

    function handleProjectAdded() {
        setRefreshKey((key) => key + 1);
    }

    if (!loggedIn) {
        return <LoginForm onLogin={handleLogin} />;
    }

    return (
        <div>
            <h1>TaskBoard</h1>

            <LogoutButton onLogout={handleLogout} />

            <AddProjectForm onAdded={handleProjectAdded} />

            <ProjectList refreshKey={refreshKey} />
        </div>
    );
}