import React, { useEffect, useState } from "react";
import TaskForm from "../components/low/TaskForm";
import TaskList from "../components/low/TaskList";
import "./ToDoList.css";

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false); // Track if tasks are loaded

    // Load tasks from localStorage on component mount
    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks")
            ? JSON.parse(localStorage.getItem("tasks"))
            : [];
        setTasks(storedTasks);
        setIsInitialized(true); // Mark tasks as initialized
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks, isInitialized]);

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
            <h1 className="todo-header">To Do List</h1>
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