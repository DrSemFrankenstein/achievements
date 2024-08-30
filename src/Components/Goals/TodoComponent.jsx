import React from "react";
import { Row, Col, Card } from "antd";
import DailyGoalsComponent from "./DailyGoalsComponent";
import WeeklyGoalsComponent from "./WeeklyGoalsComponent";
import GoalsStatisticsComponent from "./GoalsStatisticsComponent";

const TodoComponent = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card hoverable>
            <DailyGoalsComponent />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card hoverable>
          <WeeklyGoalsComponent />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TodoComponent;
