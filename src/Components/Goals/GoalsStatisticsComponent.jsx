import React from "react";
import { Row, Col, Statistic, Card, List, Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { toggleTaskCompletion } from "../../Redux/dailyGoalsSlice";
import { toggleWeeklyGoalCompletion } from "../../Redux/weeklyGoalsSlice";
import { useNavigate } from "react-router-dom";

const { Countdown } = Statistic;

const GoalsStatisticsComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const today = dayjs().format("YYYY-MM-DD");
  const weekStart = dayjs().startOf("week").format("YYYY-MM-DD");

  const dailyGoals = useSelector(
    (state) => state.dailyGoals.tasksByDate[today] || {}
  );
  const weeklyGoals = useSelector(
    (state) => state.weeklyGoals.goalsByWeek[weekStart] || {}
  );

  // Calculate the total and completed tasks for today's "morningTasks"
  const morningTasks = dailyGoals.morningTasks || [];
  const todayTotalGoals = morningTasks.length;
  const todayCompletedGoals = morningTasks.filter(
    (task) => task.completed
  ).length;

  // Calculate the total and completed tasks for this week's "weeklySuccess"
  const weeklySuccess = weeklyGoals.weeklySuccess || [];
  const weeklyTotalGoals = weeklySuccess.length;
  const weeklyCompletedGoals = weeklySuccess.filter(
    (goal) => goal.completed
  ).length;

  // Calculate end of day and end of week
  const endOfDay = dayjs().endOf("day").valueOf();
  const endOfWeek = dayjs().endOf("week").valueOf();

  // Handler to toggle task completion for daily tasks
  const handleToggleTaskCompletion = (taskId) => {
    dispatch(
      toggleTaskCompletion({
        date: today,
        category: "morningTasks",
        taskId,
      })
    );
  };

  // Handler to toggle goal completion for weekly goals
  const handleToggleWeeklyGoalCompletion = (goalId) => {
    dispatch(
      toggleWeeklyGoalCompletion({
        weekStart,
        category: "weeklySuccess",
        goalId,
      })
    );
  };

  // Handler for navigating to the "/goals" page
  const handleEmptyListClick = () => {
    navigate("/goals");
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card>
            <Row gutter={16}>
              <Col span={11}>
                <Statistic
                  title="Today's Morning Tasks"
                  value={todayCompletedGoals}
                  suffix={`/ ${todayTotalGoals}`}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
              <Col span={13}>
                <Countdown
                  title="Time left today"
                  value={endOfDay}
                  format="HH:mm:ss"
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Row gutter={16}>
              <Col span={11}>
                <Statistic
                  title="This Week's Main Successes"
                  value={weeklyCompletedGoals}
                  suffix={`/ ${weeklyTotalGoals}`}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
              <Col span={13}>
                <Countdown
                  title="Time left this week"
                  value={endOfWeek}
                  format="D[d] HH[h] mm[m] ss[s]"
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col xs={24} md={12}>
          <Card
            title="Today's Morning Tasks List"
            onClick={morningTasks.length === 0 ? handleEmptyListClick : undefined}
            hoverable={morningTasks.length === 0}
          >
            <List
              dataSource={morningTasks}
              renderItem={(task) => (
                <List.Item>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleToggleTaskCompletion(task.id)}
                  >
                    {task.text}
                  </Checkbox>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title="This Week's Main Successes List"
            onClick={weeklySuccess.length === 0 ? handleEmptyListClick : undefined}
            hoverable={weeklySuccess.length === 0}
          >
            <List
              dataSource={weeklySuccess}
              renderItem={(goal) => (
                <List.Item>
                  <Checkbox
                    checked={goal.completed}
                    onChange={() => handleToggleWeeklyGoalCompletion(goal.id)}
                  >
                    {goal.text}
                  </Checkbox>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default GoalsStatisticsComponent;
