
import { useState } from "react";

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleAddTodo = () => {
        fetch('http://localhost:3000/todos', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                description: description
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(async (res) => {
            if (!res.ok) {
                throw new Error('Failed to add todo');
            }
            const json = await res.json();
            alert('Todo added');
        })
        .catch(error => {
            console.error('Error adding todo:', error);
            alert('Failed to add todo');
        });
    };

    return (
        <div>
            <input
                style={{
                    margin: 10,
                    padding: 10
                }}
                type="text"
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
            /><br /><br />

            <input
                style={{
                    margin: 10,
                    padding: 10
                }}
                type="text"
                placeholder="Description"
                value={description}
                onChange={handleDescriptionChange}
            /><br /><br />

            <button
                style={{ margin: 10 }}
                onClick={handleAddTodo}
            >
                Add Todo
            </button>
        </div>
    );
}
