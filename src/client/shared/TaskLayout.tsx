import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface TaskLayoutProps {
  title: string;
  description: string;
  date: string;
  customkey: number;
}

const TaskLayout: React.FC<TaskLayoutProps> = ({
  title,
  description,
  date,
  customkey,
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
        {expandDescription && <p className="text-sm">{description}</p>}
        <p className="text-sm font-bold opacity-80 ">{formatDate(date)}</p>
      </div>
      <div>{expandDescription ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
    </div>
  );
};

export default TaskLayout;
