import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosAdd } from "react-icons/io";
import { getTasks } from "@/src/helper/api/getTask.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TaskLayout from "../shared/TaskLayout";
import { getIndividualTask } from "@/src/helper/api/getIndividualTask.api";
import axios from "axios";
import { UpdateTask } from "@/src/helper/api/updateTask.api";
import { AddTask } from "@/src/helper/api/addTask.api";

interface TaskDetails {
  _id: string;
  title: string;
  content: string;
  creator: any;
  createdAt?: string;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  date: string;
}

interface TaskDisplayProps {
  day: string;
}

const TaskDisplay = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState("");
  const [udescription, setUDescription] = useState<string>("");
  const [startDate, setStartDate] = useState(new Date());
  const [formState, setFormState] = useState(false);
  const [Individualtask, setTask] = useState<TaskDetails>();
  const [detailsTab, setDetailsTab] = useState(false);

  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    data: tasks,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const { mutate: createTask } = useMutation({
    mutationFn: AddTask,
    onSuccess: () => {
      console.log("Task created successfully");
    },
    onError: () => {
      console.error("Failed to change create task");
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: </span>;
  }

  const handleFormState = () => {
    setFormState(!formState);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
    try {
      createTask({ title: title, description: description, date: startDate, type:type });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setFormState(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id: string) => {
    const updateData = {
      title: Individualtask?.title,
      description: udescription,
    };
    console.log("see", title);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://backend-productive-pro-yedj.vercel.app/task/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUDescription("");
      console.log("Devoooo", response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `http://backend-productive-pro-yedj.vercel.app/task/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Deleted", response);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTask = async (id: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://backend-productive-pro-yedj.vercel.app/task/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Dev", response.data.task);
      setTask(response.data.task);
      setDetailsTab(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className=" w-full">
        <div className="flex space-x-4">
          <h2 className="text-3xl font-bold">Today</h2>
          <p className=" border border-solid text-lg text-center font-bold p-1 w-10 rounded-md">
            {tasks.length}
          </p>
        </div>
        <div
          onClick={handleFormState}
          className="flex space-x-1 border border-solid p-2 rounded-md mt-8 w-full"
        >
          <IoIosAdd className=" opacity-50" />
          <p className="text-sm font-bold opacity-50">Add New Task</p>
        </div>
        {formState && (
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col space-y-4"
          >
            <div className="space-y-1 flex flex-col">
              <label className="text-sm font-bold">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-solid w-[40%] p-2 rounded-md"
              />
            </div>
            <div className="space-y-1 flex flex-col">
              <label className="text-sm font-bold">Description</label>
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-solid w-[40%] p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col space-y-1 w-[50%]">
              <label className="text-sm font-bold">Date</label>
              <DatePicker
                showIcon
                className="border border-solid p-2 text-sm"
                dateFormat="yyyy/MM/dd"
                selected={startDate}
                onChange={(date) => date && setStartDate(date)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold">Type</label>
              <select
                className="border border-solid w-[70%] p-1 rounded-md outline-none"
                value={type}
                onChange={(e)=>setType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
              </select>
            </div>
            <button type="submit" className="bg-yellow-300 p-2 w-32 rounded-md">
              Add Task
            </button>
          </form>
        )}
        <div>
          {tasks &&
            tasks?.map((task: Task, index: any) => (
              <div onClick={() => fetchTask(task._id)} key={index}>
                <TaskLayout
                  customkey={index}
                  title={task.title}
                  description={task.description}
                  date={task.date}
                />
              </div>
            ))}
        </div>
      </section>
      {detailsTab && (
        <section className="w-[40%] bg-gray-100 p-3">
          <h2 className="font-bold">Task Details</h2>
          {Individualtask && (
            <p className="text-sm font-bold mt-4 opacity-50">
              {Individualtask.title}
            </p>
          )}
          <div className="space-y-1 mt-4 flex flex-col">
            <label className="text-sm opacity-50 font-bold">Description</label>
            <textarea
              name="udescription"
              id="udescription"
              value={udescription}
              onChange={(e) => setUDescription(e.target.value)}
              className="border border-solid  p-2 rounded-md"
            />
          </div>
          <div className="flex space-x-4 mt-44">
            {Individualtask && (
              <button
                onClick={() => handleDelete(Individualtask._id)}
                className="bg-gray-300 text-xs  w-28 p-1 rounded-sm "
              >
                Delete Task
              </button>
            )}
            {Individualtask && (
              <button
                onClick={() => handleUpdate(Individualtask._id)}
                className="bg-yellow-500 text-xs w-28 p-1 rounded-sm "
              >
                Save Changes
              </button>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default TaskDisplay;
