import React, { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ addTask }) => {
    const [task, setTask] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim()) {
            addTask(task);
            setTask("");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <button type="submit">
                    <i className="fas fa-plus"></i>
                </button>
            </form>
        </div>
    );
};

export default TaskForm;