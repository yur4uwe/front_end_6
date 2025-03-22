import React, { useState } from "react";
import TaskForm from "../components/low/TaskForm";
import TaskList from "../components/low/TaskList";
import "./ToDoList.css";

function ToDoList() {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const toggleComplete = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const editTask = (id, newText) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, text: newText } : task
            )
        );
    };

    return (
        <div id="to-do-list">
            <h1>To Do List</h1>
            <TaskForm addTask={addTask} />
            <TaskList
                tasks={tasks}
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
                editTask={editTask}
            />
        </div>
    );
}

export default ToDoList;