import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUpcomingTasks } from "@/src/helper/api/getUpcomingTask.api";
import CalendarSection from ".";
import MyCalendar from ".";
import GeneralLayout from "../../shared/GeneralLayout";

const CalendarComponent: React.FC = () => {
  const {
    isLoading,
    isError,
    data: tasks,
    error,
  } = useQuery({
    queryKey: ["upcomingTasks"],
    queryFn: getUpcomingTasks,
  });

  console.log(tasks, "see tasks")
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: </div>;

  return <GeneralLayout> <MyCalendar/></GeneralLayout>
};

export default CalendarComponent;
