import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosAdd } from "react-icons/io";
import SideBar from "../shared/SideBar";
import { getTasks } from "@/src/helper/api/getTask.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddTask } from "@/src/helper/api/addTask.api";
import TaskLayout from "../shared/TaskLayout";
import { getIndividualTask } from "@/src/helper/api/getIndividualTask.api";
import axios from "axios";
import { UpdateTask } from "@/src/helper/api/updateTask.api";

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

export default function TodayInner() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [udescription, setUDescription] = useState<string>("");
  const [startDate, setStartDate] = useState(new Date());
  const [formState, setFormState] = useState(false);
  const [Individualtask, setTask] = useState<TaskDetails>();

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

  console.log(tasks);

  const handleFormState = () => {
    setFormState(!formState);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
    try {
      createTask({ title: title, description: description, date: startDate });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setFormState(false);
    } catch (error) {
      console.log("Na Beans you dey cook. Lmao");
    }
  };

  const handleUpdate = async (id: string) => {
    const updateData = {
      title: Individualtask?.title,
      description: udescription,
    };
    console.log("see", title)
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://localhost:8080/task/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUDescription("")
      console.log("Devoooo", response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `http://localhost:8080/task/${id}`,
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
      const response = await axios.get(`http://localhost:8080/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Dev", response.data.task);
      setTask(response.data.task);
    } catch (err) {
      console.log(err);
    }
  };
  

  const getProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken)
    try {
      const response = await fetch("http://localhost:8080/profile", {
        method: "GET",
        headers: { 
          "Content-type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
      });
  
  
      const data = await response.json();
      console.log("Data received from API:", data);
      return data.tasks;
    } catch (error) {
      console.log(error);
      
    }
  };
  

  return (
      <section className=" w-full">
        <div className="flex space-x-4">
          <h2 className="text-3xl font-bold">Today</h2>
          <button onClick={getProfile} className="bg-blue-400 w-32 p-1 text-white">Get profile</button>
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
   
  );
}
