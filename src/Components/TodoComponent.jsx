import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DatePicker, List, Button, Input, Checkbox, Select } from "antd";
import dayjs from "dayjs";  // Import dayjs instead of moment
import {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} from "../Redux/todoSlice";
import { v4 as uuidv4 } from "uuid";

const { Option } = Select;

const categories = [
  { key: "morningTasks", label: "Что я собираюсь достичь сегодня?" },
  { key: "morningSuccess", label: "Как я могу сделать день успешным?" },
  { key: "eveningImprovements", label: "Что пошло не так и как я могу улучшить?" },
  { key: "gratitude", label: "За что я благодарен?" },
  { key: "weeklySuccess", label: "Основные успехи за неделю." },
  { key: "weeklyLearnings", label: "Чему я научился за неделю?" },
  { key: "weeklyImprovements", label: "В чём я хочу улучшиться?" },
];

const TodoComponent = () => {
  const [date, setDate] = useState(dayjs());  // Initialize with today's date
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0].key);
  const tasks = useSelector((state) =>
    date ? state.todo.tasksByDate[date.format("YYYY-MM-DD")] || {} : {}
  );
  const dispatch = useDispatch();

  const handleDateChange = (date) => {
    setDate(date ? dayjs(date) : dayjs()); // Convert date to dayjs format
  };

  const handleAddTask = () => {
    if (newTask.trim() && date) {
      dispatch(addTask({
        date: date.format("YYYY-MM-DD"),
        category: selectedCategory,  // Include the category in the payload
        task: {
          id: uuidv4(),
          text: newTask,
          completed: false,
        },
      }));
      setNewTask("");
    }
  };

  const handleToggleCompletion = (taskId) => {
    if (date) {
      dispatch(toggleTaskCompletion({
        date: date.format("YYYY-MM-DD"),
        category: selectedCategory,  // Include the category in the payload
        taskId,
      }));
    }
  };

  const handleDeleteTask = (taskId) => {
    if (date) {
      dispatch(deleteTask({
        date: date.format("YYYY-MM-DD"),
        category: selectedCategory,  // Include the category in the payload
        taskId,
      }));
    }
  };

  const renderTaskList = (category) => {
    const tasksForCategory = tasks[category.key] || [];
    return (
      <div key={category.key} style={{ marginTop: 20 }}>
        <h3>{category.label}</h3>
        <List
          bordered
          dataSource={tasksForCategory}
          renderItem={(task) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  onClick={() => handleToggleCompletion(task.id)}
                >
                  {task.completed ? "Undo" : "Complete"}
                </Button>,
                <Button type="link" onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </Button>,
              ]}
            >
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggleCompletion(task.id)}
              >
                {task.text}
              </Checkbox>
            </List.Item>
          )}
        />
      </div>
    );
  };

  return (
    <div>
      <DatePicker
        onChange={handleDateChange}
        value={date}
        format="YYYY-MM-DD"
        allowClear={true}
      />
      <div style={{ marginTop: 20 }}>
        <Select
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
          style={{ width: "100%", marginBottom: 10 }}
        >
          {categories.map((category) => (
            <Option key={category.key} value={category.key}>
              {category.label}
            </Option>
          ))}
        </Select>
        <Input
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onPressEnter={handleAddTask}
          style={{ marginBottom: 10 }}
        />
        <Button type="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </div>
      {categories.map((category) => renderTaskList(category))}
    </div>
  );
};

export default TodoComponent;
