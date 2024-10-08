import { useState, useEffect } from "react";
import Header from "./components/Header";
import ToDoForm from "./components/ToDoForm";
import ToDoList from "./components/ToDoList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [sortBy, setSortBy] = useState("dateAdded");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();
      setTasks([...tasks, data]);
      setIsFormVisible(false);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const toggleComplete = async (taskId) => {
    const taskToUpdate = tasks.find((task) => task._id === taskId);

    if (!taskToUpdate) {
      console.error("Task not found");
      return;
    }

    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      const data = await res.json();
      setTasks(tasks.map((task) => (task._id === taskId ? data : task)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const removeTask = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    if (sortBy === "dateAdded") {
      return b.id - a.id;
    } else if (sortBy === "timeRemaining") {
      const now = new Date();
      const timeRemainingA = new Date(a.dueDate) - now;
      const timeRemainingB = new Date(b.dueDate) - now;
      return timeRemainingA - timeRemainingB;
    } else if (sortBy === "dueDate") {
      const now = new Date();
      const timeRemainingA = new Date(a.dueDate) - now;
      const timeRemainingB = new Date(b.dueDate) - now;
      return timeRemainingB - timeRemainingA;
    }

    return 0;
  });

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto p-4">
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="block mx-auto px-5 py-3 mb-4 shadow-md shadow-black bg-gray-600 text-blue-50 rounded hover:bg-gray-800"
        >
          {isFormVisible ? "X" : "add a new task"}
        </button>

        {isFormVisible && <ToDoForm addTask={addTask} />}

        {tasks.length > 0 && (
          <div className="my-4">
            <label className="mr-2">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="dateAdded">Date Added</option>
              <option value="timeRemaining">
                Time Remaining (lowest to highest)
              </option>
              <option value="dueDate">
                Time Remaining (highest to lowest)
              </option>
            </select>
          </div>
        )}

        <ToDoList
          tasks={sortedTasks}
          toggleComplete={toggleComplete}
          removeTask={removeTask}
        />
      </div>
    </div>
  );
}

export default App;
