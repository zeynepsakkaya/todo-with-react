import { useState } from "react";
import Header from "./components/Header";
import ToDoForm from "./components/ToDoForm";
import ToDoList from "./components/ToDoList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      text: task.text,
      dueDate: task.dueDate,
      color: task.color,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setIsFormVisible(false); // Hide the form after adding a task
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

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

        <ToDoList
          tasks={tasks}
          toggleComplete={toggleComplete}
          removeTask={removeTask}
        />
      </div>
    </div>
  );
}

export default App;
