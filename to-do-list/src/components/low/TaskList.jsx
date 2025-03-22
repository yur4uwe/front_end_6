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

    /**
     * 
     * @param {number} taskId 
     * @returns {JSX.Element}
     */
    const editTaskForm = (taskId) => {
        return (
            <>
                <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                />
                <button onClick={() => handleSave(taskId)}>
                    <i className="fas fa-save"></i>
                </button>
            </>
        )
    }

    /**
     * 
     * @param {{
     *    id: number,
     *    text: string,
     *    completed: boolean
     * }} task 
     * @returns {JSX.Element}
     */
    const listTask = (task) => (
        <>
            <span>{task.text}</span>
            <div>
                <button onClick={() => toggleComplete(task.id)}>
                    <i className={`fas ${task.completed ? "fa-undo" : "fa-check"}`}></i>
                </button>
                {!task.completed && <button onClick={() => handleEdit(task.id, task.text)}>
                    <i className="fas fa-edit"></i>
                </button>}
                <button onClick={() => deleteTask(task.id)}>
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </>
    )

    const appendTasks = (tasks) => {
        return tasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
                {editingId === task.id ? editTaskForm(task.id) : listTask(task)}
            </li>
        ));
    }

    return (
        <div id="task-list">
            <ul>
                {tasks.length ? appendTasks(tasks) : <p>You don't have any active tasks</p>}
            </ul>
        </div>
    );
};

export default TaskList;