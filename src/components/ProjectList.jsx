import { useEffect, useState } from 'react';
import { api } from '../api';

export default function ProjectList({ refreshKey }) {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadProjects() {
            try {
                const data = await api('/projects');
                setProjects(data.data);
            } catch {
                setError('Failed to load projects');
            }
        }

        loadProjects();
    }, [refreshKey]);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Projects</h2>

            {projects.length === 0 ? (
                <p>No projects yet.</p>
            ) : (
                projects.map((project) => (
                    <div key={project.id}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <p>Tasks: {project.tasks_count ?? 0}</p>
                    </div>
                ))
            )}
        </div>
    );
}