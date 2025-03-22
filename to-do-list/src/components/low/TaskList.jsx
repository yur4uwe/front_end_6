import React, { useState } from "react";
import "./TaskList.css";

const TaskList = ({ tasks, deleteTask, toggleComplete, editTask }) => {
    const [editingId, setEditingId] = useState(null);
    const [newText, setNewText] = useState("");

    const handleEdit = (id, text) => {
        setEditingId(id);
        setNewText(text);
    };

    const handleSave = (id) => {
        editTask(id, newText);
        setEditingId(null);
        setNewText("");
    };

    return (
        <div id="task-list">
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                        {editingId === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={newText}
                                    onChange={(e) => setNewText(e.target.value)}
                                />
                                <button onClick={() => handleSave(task.id)}>
                                    <i className="fas fa-save"></i>
                                </button>
                            </>
                        ) : (
                            <>
                                <span>{task.text}</span>
                                <div>
                                    <button onClick={() => toggleComplete(task.id)}>
                                        <i className={`fas ${task.completed ? "fa-undo" : "fa-check"}`}></i>
                                    </button>
                                    <button onClick={() => handleEdit(task.id, task.text)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button onClick={() => deleteTask(task.id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;