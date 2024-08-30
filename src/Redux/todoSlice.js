import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasksByDate: {},
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { date, category, task } = action.payload;

      // Ensure that the date object exists
      if (!state.tasksByDate[date]) {
        state.tasksByDate[date] = {};
      }

      // Ensure that the category array exists within the date object
      if (!state.tasksByDate[date][category]) {
        state.tasksByDate[date][category] = [];
      }

      // Push the new task to the category array
      state.tasksByDate[date][category].push(task);
    },
    updateTask: (state, action) => {
      const { date, category, taskId, taskData } = action.payload;
      const tasks = state.tasksByDate[date]?.[category];
      if (tasks) {
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          tasks[taskIndex] = { ...tasks[taskIndex], ...taskData };
        }
      }
    },
    deleteTask: (state, action) => {
      const { date, category, taskId } = action.payload;
      if (state.tasksByDate[date]?.[category]) {
        state.tasksByDate[date][category] = state.tasksByDate[date][
          category
        ].filter((task) => task.id !== taskId);
      }
    },
    toggleTaskCompletion: (state, action) => {
      const { date, category, taskId } = action.payload;
      const tasks = state.tasksByDate[date]?.[category];
      if (tasks) {
        const task = tasks.find((task) => task.id === taskId);
        if (task) {
          task.completed = !task.completed;
        }
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, toggleTaskCompletion } =
  todoSlice.actions;

export default todoSlice.reducer;
