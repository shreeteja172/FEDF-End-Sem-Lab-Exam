import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks, addTask, deleteTask, updateTask } from "./api";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async (title) => {
    try {
      const newTask = {
        title,
        completed: false,
      };
      const response = await addTask(newTask);
      setTasks([response.data, ...tasks]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleTask = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(id, updatedTask);
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Task Manager</h1>
      </header>
      <main>
        <TaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onToggle={handleToggleTask}
        />
      </main>
    </div>
  );
}
