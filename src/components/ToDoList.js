import ToDoItem from "./ToDoItem";

const ToDoList = ({ tasks, toggleComplete, removeTask }) => {
  return (
    <div className="mt-4">
      {tasks.map((task) => (
        <ToDoItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          removeTask={removeTask}
        />
      ))}
    </div>
  );
};

export default ToDoList;
