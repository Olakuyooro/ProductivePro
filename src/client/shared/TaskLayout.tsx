import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface TaskLayoutProps {
  title: string;
  description: string;
  date: string;
  customkey: number;
  type: string;
}

const TaskLayout: React.FC<TaskLayoutProps> = ({
  title,
  description,
  date,
  customkey,
  type,
}) => {
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleString();
  };
  const [expandDescription, setExpandDescription] = useState(false);

  const handleDescription = () => {
    setExpandDescription(!expandDescription);
  };

  return (
    <div
      key={customkey}
      onClick={handleDescription}
      className="border-[0.1rem]  border-solid p-2 flex justify-between"
    >
      <div className="space-y-4">
        <p className="text-sm font-semibold">{title}</p>
        {expandDescription && (
          <div className="flex space-x-3">
            <p className="text-sm">{description}</p>
            <div
              className={
                type === "personal"
                  ? "bg-red-200 p-1 rounded-sm w-4 h-4"
                  : "bg-blue-200 p-1 rounded-sm w-4 h-4"
              }
            ></div>
          </div>
        )}
        <p className="text-sm font-bold opacity-80 ">{formatDate(date)}</p>
      </div>
      <div>{expandDescription ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
    </div>
  );
};

export default TaskLayout;
