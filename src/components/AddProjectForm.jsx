import { useState } from 'react';
import { api } from '../api';

export default function AddProjectForm({ onAdded }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await api('/projects', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    description,
                }),
            });

            setName('');
            setDescription('');
            onAdded();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Project</h2>

            <input
                type="text"
                placeholder="Project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit">Add Project</button>
        </form>
    );
}