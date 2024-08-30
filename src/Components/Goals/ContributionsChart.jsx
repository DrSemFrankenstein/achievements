import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays, format } from "date-fns";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";

const ContributionsChart = () => {
  const today = new Date();

  // Get the tasks from the Redux store
  const tasksByDate = useSelector((state) => state.dailyGoals.tasksByDate);

  // Transform the data into a format suitable for CalendarHeatmap
  const values = Object.keys(tasksByDate).map((date) => {
    const morningTasks = tasksByDate[date]?.morningTasks || [];
    const completedTasks = morningTasks.filter((task) => task.completed).length;

    return {
      date: date, // The date should be in "YYYY-MM-DD" format
      count: completedTasks,
    };
  });

  return (
    <div>
      <h2>Tasks Contributions</h2>
      <CalendarHeatmap
        startDate={subDays(today, 365)}
        endDate={today}
        values={values}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-github-${value.count}`;
        }}
        // Customize the way the cells are rendered
        transformDayElement={(element, value, index) => (
          <Tooltip
            key={index}
            title={
              value?.date
                ? `${value.date} has ${value.count ?? 0} completed tasks`
                : "No tasks available"
            }
          >
            {element}
          </Tooltip>
        )}
        showWeekdayLabels={true}
      />
    </div>
  );
};

export default ContributionsChart;
