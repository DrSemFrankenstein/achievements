import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DatePicker, List, Button, Input, Checkbox, Select } from "antd";
import dayjs from "dayjs";
import {
  addWeeklyGoal,
  toggleWeeklyGoalCompletion,
  deleteWeeklyGoal,
} from "../../Redux/weeklyGoalsSlice";
import { v4 as uuidv4 } from "uuid";

const { Option } = Select;

const categories = [
  { key: "weeklySuccess", label: "Main successes of the week." },
  { key: "weeklyLearnings", label: "What I learned this week." },
  { key: "weeklyImprovements", label: "Areas I want to improve." },
];

const WeeklyGoalsComponent = () => {
  const [weekStart, setWeekStart] = useState(dayjs().startOf("week"));
  const [newGoal, setNewGoal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0].key);

  const goals = useSelector((state) =>
    weekStart ? state.weeklyGoals.goalsByWeek[weekStart.format("YYYY-MM-DD")] || {} : {}
  );

  const dispatch = useDispatch();

  // Calculate the number of weeklySuccess goals
  const weeklySuccessCount = goals.weeklySuccess ? goals.weeklySuccess.length : 0;

  const handleWeekChange = (date) => {
    setWeekStart(date ? dayjs(date).startOf("week") : dayjs().startOf("week"));
  };

  const handleAddGoal = () => {
    if (newGoal.trim() && weekStart) {
      const payload = {
        weekStart: weekStart.format("YYYY-MM-DD"),
        category: selectedCategory,
        goal: {
          id: uuidv4(),
          text: newGoal,
          completed: false,
        },
      };

      dispatch(addWeeklyGoal(payload));
      setNewGoal("");
    }
  };

  const handleToggleCompletion = (goalId, category) => {
    if (weekStart) {
      dispatch(
        toggleWeeklyGoalCompletion({
          weekStart: weekStart.format("YYYY-MM-DD"),
          category, // Pass the correct category here
          goalId,
        })
      );
    }
  };

  const handleDeleteGoal = (goalId, category) => {
    if (weekStart) {
      dispatch(
        deleteWeeklyGoal({
          weekStart: weekStart.format("YYYY-MM-DD"),
          category, // Pass the correct category here
          goalId,
        })
      );
    }
  };

  const renderGoalList = (category) => {
    const goalsForCategory = goals[category.key] || [];
    return (
      <div key={category.key} style={{ marginTop: 20 }}>
        <h3>{category.label}</h3>
        <List
          bordered
          dataSource={goalsForCategory}
          renderItem={(goal) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  onClick={() => handleToggleCompletion(goal.id, category.key)}
                >
                  {goal.completed ? "Undo" : "Complete"}
                </Button>,
                <Button type="link" onClick={() => handleDeleteGoal(goal.id, category.key)}>
                  Delete
                </Button>,
              ]}
            >
              <Checkbox
                checked={goal.completed}
                onChange={() => handleToggleCompletion(goal.id, category.key)}
              >
                {goal.text}
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
        Weekly Goals ({weeklySuccessCount} Successes)
      </h2>
      <DatePicker
        onChange={handleWeekChange}
        value={weekStart}
        picker="week"
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
          placeholder="Add a new weekly goal"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onPressEnter={handleAddGoal}
          style={{ marginBottom: 10 }}
        />
        <Button type="primary" onClick={handleAddGoal}>
          Add Goal
        </Button>
      </div>
      {categories.map((category) => renderGoalList(category))}
    </div>
  );
};

export default WeeklyGoalsComponent;
