import React from "react";
import {  getUpcomingTasks } from "@/src/helper/api/getUpcomingTask.api";
import DayTaskManager from "@/src/client/shared/DayTaskManger";

const UpcomingInnerTasks: React.FC = () => {
  return <DayTaskManager taskType="upcoming" dayTitle="Upcoming" fetchTasks={getUpcomingTasks} />;
};

export default UpcomingInnerTasks;
