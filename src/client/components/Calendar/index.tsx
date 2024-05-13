import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getUpcomingTasks } from "@/src/helper/api/getUpcomingTask.api";
import { useQuery } from "@tanstack/react-query";

function MyCalendar() {
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

  // Transform tasks into FullCalendar events
  const events = tasks.map((task:any) => ({
    title: task.title,
    date: formatDate(task.date), // Format date here
  }));

  return (
    <div className="w-full h-max"> 
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
}

function formatDate(dateString:any) {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); 
  const day = String(dateObject.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default MyCalendar;
