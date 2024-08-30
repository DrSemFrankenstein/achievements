import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DatePicker,
  List,
  Button,
  Input,
  Checkbox,
  Select,
} from "antd";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { addTask, toggleTaskCompletion, deleteTask } from "../../Redux/dailyGoalsSlice";

const { Option } = Select;

const categories = [
  { key: "morningTasks", label: "What do I plan to achieve today?" },
  { key: "morningSuccess", label: "How can I make the day successful?" },
  {
    key: "eveningImprovements",
    label: "What went wrong and how can I improve?",
  },
  { key: "gratitude", label: "What am I grateful for?" },
];

const DailyGoalsComponent = () => {
  const [date, setDate] = useState(dayjs());
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0].key);

  const tasks = useSelector((state) =>
    date ? state.dailyGoals.tasksByDate[date.format("YYYY-MM-DD")] || {} : {}
  );

  const dispatch = useDispatch();

  // Calculate the number of morningTasks
  const morningTasksCount = tasks.morningTasks ? tasks.morningTasks.length : 0;

  const handleDateChange = (date) => {
    setDate(date ? dayjs(date) : dayjs());
  };

  const handleAddTask = () => {
    if (newTask.trim() && date) {
      dispatch(
        addTask({
          date: date.format("YYYY-MM-DD"),
          category: selectedCategory,
          task: {
            id: uuidv4(),
            text: newTask,
            completed: false,
          },
        })
      );
      setNewTask("");
    }
  };

  const handleToggleCompletion = (taskId, category) => {
    if (date) {
      dispatch(
        toggleTaskCompletion({
          date: date.format("YYYY-MM-DD"),
          category, // Pass the correct category here
          taskId,
        })
      );
    }
  };

  const handleDeleteTask = (taskId, category) => {
    if (date) {
      dispatch(
        deleteTask({
          date: date.format("YYYY-MM-DD"),
          category, // Pass the correct category here
          taskId,
        })
      );
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
                  onClick={() => handleToggleCompletion(task.id, category.key)}
                >
                  {task.completed ? "Undo" : "Complete"}
                </Button>,
                <Button type="link" onClick={() => handleDeleteTask(task.id, category.key)}>
                  Delete
                </Button>,
              ]}
            >
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggleCompletion(task.id, category.key)}
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
      <h2 style={{ textAlign: "center" }}>
        Daily Goals ({morningTasksCount} Morning Tasks)
      </h2>
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

export default DailyGoalsComponent;
