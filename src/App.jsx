import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTasks, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isError, setIsError] = useState("");

  const addTask = () => {
    if (newTasks.trim() === "") {
      setIsError("Tasks cannot empty!");

      setTimeout(() => {
        setIsError("");
      }, 1500);

      return;
    }

    const repeatedPattern = /(.)\1{4,}/;
    if (repeatedPattern.test(newTasks)) {
      setIsError("Tasks contain too many repeated characters");

      setTimeout(() => {
        setIsError("");
      }, 1500);

      return;
    }

    if (dueDate.trim() === "") {
      setIsError("Due date cannot empty!");

      setTimeout(() => {
        setIsError("");
      }, 1500);

      return;
    }
    setTasks([
      ...tasks,
      { id: Date.now(), dueDate: dueDate, text: newTasks, completed: false },
    ]);
    setNewTask("");
    setDueDate("");
    setIsError("");
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <>
      <div className="App">
        <h1>To-Do List</h1>
        <div className="input-container">
          <input
            type="text"
            value={newTasks}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
          {isError && <p style={{ color: "red" }}>{isError}</p>}
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text} - Due: {task.dueDate}
              </span>
              <button
                onClick={() => toggleCompletion(task.id)}
                style={{ backgroundColor: task.completed ? "red" : "green" }}
              >
                {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
