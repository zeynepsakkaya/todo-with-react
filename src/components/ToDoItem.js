const isDarkColor = (color) => {
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);

  let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 128;
};

const formatDate = (dateString) => {
  const optionsDate = { day: "2-digit", month: "long", year: "numeric" };
  const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-GB", optionsDate);
  const formattedTime = date.toLocaleTimeString("en-GB", optionsTime);

  return `${formattedDate} ${formattedTime}`;
};

const ToDoItem = ({ task, toggleComplete, removeTask }) => {
  const titleColor = isDarkColor(task.color) ? "white" : "black";
  const dueColor = isDarkColor(task.color) ? "#6b7280" : "#4b5563";

  return (
    <div
      className="p-4 mb-2 rounded shadow"
      style={{ backgroundColor: task.color }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
            className="mr-3"
          />
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              color: titleColor,
            }}
          >
            {task.text}
          </span>
        </div>
        <button
          onClick={() => removeTask(task.id)}
          style={{ color: titleColor }}
          className="text-l hover:text-2xl"
        >
          X
        </button>
      </div>
      <div className="text-xs mt-2">
        <span style={{ color: dueColor }}>due: {formatDate(task.dueDate)}</span>
      </div>
    </div>
  );
};

export default ToDoItem;
