import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goalsByWeek: {},
};

const weeklyGoalsSlice = createSlice({
  name: "weeklyGoals",
  initialState,
  reducers: {
    addWeeklyGoal: (state, action) => {
      const { weekStart, category, goal } = action.payload;

      // Create a new state structure rather than mutating directly
      return {
        ...state,
        goalsByWeek: {
          ...state.goalsByWeek,
          [weekStart]: {
            ...state.goalsByWeek[weekStart],
            [category]: [
              ...(state.goalsByWeek[weekStart]?.[category] || []),
              goal,
            ],
          },
        },
      };
    },
    updateWeeklyGoal: (state, action) => {
      const { weekStart, category, goalId, goalData } = action.payload;
      return {
        ...state,
        goalsByWeek: {
          ...state.goalsByWeek,
          [weekStart]: {
            ...state.goalsByWeek[weekStart],
            [category]: state.goalsByWeek[weekStart][category].map((goal) =>
              goal.id === goalId ? { ...goal, ...goalData } : goal
            ),
          },
        },
      };
    },
    deleteWeeklyGoal: (state, action) => {
      const { weekStart, category, goalId } = action.payload;
      return {
        ...state,
        goalsByWeek: {
          ...state.goalsByWeek,
          [weekStart]: {
            ...state.goalsByWeek[weekStart],
            [category]: state.goalsByWeek[weekStart][category].filter(
              (goal) => goal.id !== goalId
            ),
          },
        },
      };
    },
    toggleWeeklyGoalCompletion: (state, action) => {
      const { weekStart, category, goalId } = action.payload;
      return {
        ...state,
        goalsByWeek: {
          ...state.goalsByWeek,
          [weekStart]: {
            ...state.goalsByWeek[weekStart],
            [category]: state.goalsByWeek[weekStart][category].map((goal) =>
              goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
            ),
          },
        },
      };
    },
  },
});

export const {
  addWeeklyGoal,
  updateWeeklyGoal,
  deleteWeeklyGoal,
  toggleWeeklyGoalCompletion,
} = weeklyGoalsSlice.actions;

export default weeklyGoalsSlice.reducer;
