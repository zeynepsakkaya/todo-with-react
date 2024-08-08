import { useState } from "react";

const ToDoForm = ({ addTask }) => {
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [color, setColor] = useState("#ffffff");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTask({ text: input, dueDate, color });
      setInput("");
      setDueDate("");
      setColor("#ffffff");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-purple-200 p-4 rounded shadow-2xl shadow-black"
    >
      <div className="mb-4">
        <label htmlFor="task" className="block text-gray-700">
          title
        </label>
        <input
          id="task"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700">
          due date & time
        </label>
        <input
          id="date"
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="color"
          className="block mx-auto text-center text-gray-700"
        >
          color
        </label>
        <input
          id="color"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="block mx-auto h-10"
        />
      </div>
      <button
        type="submit"
        className="w-3/6 mx-auto block py-2 shadow-md shadow-black bg-gray-600 text-blue-50 rounded hover:bg-gray-800"
      >
        add
      </button>
    </form>
  );
};

export default ToDoForm;
