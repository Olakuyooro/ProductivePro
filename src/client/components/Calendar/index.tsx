import React from "react";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import type { Dayjs } from "dayjs";
import GeneralLayout from "../../shared/GeneralLayout";
import { useQuery } from "@tanstack/react-query";
import { getUpcomingTasks } from "@/src/helper/api/getUpcomingTask.api";

const getListData = (value: Dayjs) => {
  const {
    isLoading,
    isError,
    data: tasks,
    error,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useQuery({
    queryKey: ["upcomingTasks"],
    queryFn: getUpcomingTasks,
  });

  const filteredEvents = tasks.filter((event: any) => {
    return value.date() === event.date && value.month() === event.month;
  });

  return filteredEvents.map((event: any) => ({
    type: event.type,
    content: event.description,
  }));
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CalendarSection: React.FC = () => {
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item: any, index: any) => (
          <li key={index}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <GeneralLayout>
      <Calendar cellRender={cellRender} />
    </GeneralLayout>
  );
};

export default CalendarSection;
