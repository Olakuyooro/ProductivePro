import Link from "next/link";
import React from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

interface ReuseListProps {
  title: string;
  icon?: React.ReactElement;
  frequency?: number;
  onClick?: ()=>void;
  href: string
}

const ReuseList: React.FC<ReuseListProps> = ({ title, icon, frequency, onClick, href }) => {
  return (
    <Link href={href} onClick={onClick} className="flex justify-between">
      <div className="flex space-x-3 cursor-pointer">
        {icon}
        <p className="text-xs">{title}</p>
      </div>
      {frequency !== undefined && frequency !== null ? (
        <p className="bg-gray-400 p-1 rounded-md w-6 text-center text-[0.5rem] font-bold">
          {frequency}
        </p>
      ) : null}
    </Link>
  );
};

export default ReuseList;
