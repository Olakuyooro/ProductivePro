import React from "react";
import DayTaskManager from "@/src/client/shared/DayTaskManger";
import { getTasks } from "@/src/helper/api/getTask.api";

const TodayInnerTasks: React.FC = () => {
  return <DayTaskManager taskType="today" dayTitle="Today" fetchTasks={getTasks} />;
};

export default TodayInnerTasks;
