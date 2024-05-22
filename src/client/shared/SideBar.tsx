import {
  MdKeyboardDoubleArrowRight,
  MdLogout,
  MdMenu,
  MdStickyNote2,
} from "react-icons/md";
import ReuseList from "./ReuseList";
import { FaListCheck, FaRegCalendarDays } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { useTasks } from "../context/UpcomingTaskContext/UpcomingTaskContext";
import { useTodayTasks } from "../context/TodayTaskContext/TodayTaskContext";

const SideBar = () => {
  const logout = () => {
    try {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const { isLoading, isError, tasks, error } = useTasks();
  const { isLoading: loading, isError: iError, todayTasks, error: Error } = useTodayTasks();

  const personalTask = tasks?.filter((task)=>(task.type === "personal"))
  const workTask = tasks?.filter((task)=>(task.type === "work"))

  return (
    <div className="w-64 h-full bg-gray-100 rounded-md p-3">
      <section className="flex justify-between">
        <h3 className="text-base font-bold">Menu</h3>
        <MdMenu className="text-xl" />
      </section>
      <input
        type="text"
        placeholder="search"
        className="bg-gray-100 w-56 mt-2 border border-solid p-1 rounded-md text-xs font-bold outline-none"
      />
      <section className="mt-6">
        <h6 className="text-xs font-bold opacity-85 mb-4">TASKS</h6>
        <div className="flex flex-col space-y-3">
          <ReuseList
            href="/upcoming"
            title="Upcoming"
            icon={<MdKeyboardDoubleArrowRight className=" opacity-50" />}
            frequency={tasks?.length}
          />
          <ReuseList
            href="/"
            title="Today"
            icon={<FaListCheck className=" opacity-50" />}
            frequency={todayTasks?.length}
          />
          <ReuseList
            href="/calendar"
            title="Calendar"
            icon={<FaRegCalendarDays className=" opacity-50" />}
          />
          <ReuseList
            href="/stickywall"
            title="Sticky Wall"
            icon={<MdStickyNote2 className=" opacity-50" />}
          />
        </div>
      </section>
      <section className="mt-6">
        <h6 className="text-xs font-bold opacity-85 mb-4">LISTS</h6>
        <div className="flex flex-col space-y-3">
          <ReuseList
            href="/personal"
            title="Personal"
            icon={<div className="w-4 h-4 rounded-sm bg-red-300"></div>}
            frequency={personalTask?.length}
          />
          <ReuseList
            href="/work"
            title="Work"
            icon={<div className="w-4 h-4 rounded-sm bg-blue-300"></div>}
            frequency={workTask?.length}
          />
        </div>
      </section>
      <div className="mt-32 flex flex-col space-y-4">
        <ReuseList
          href=""
          title="Settings"
          icon={<CiSettings className=" opacity-50" />}
        />
        <ReuseList
          href=""
          onClick={logout}
          title="Sign Out"
          icon={<MdLogout className=" opacity-50" />}
        />
      </div>
    </div>
  );
};

export default SideBar;
