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

export default function DetailBar() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState("")
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
      createTask({ title: title, description: description, date: startDate, type:type });
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
        `http://backend-productive-pro-yedj.vercel.app/task/${id}`,
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
      const response = await axios.get(`http://backend-productive-pro-yedj.vercel.app/task/${id}`, {
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
      const response = await fetch("http://backend-productive-pro-yedj.vercel.app/profile", {
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
         {Individualtask && <button onClick={() => handleDelete(Individualtask._id)} className="bg-gray-300 text-xs  w-28 p-1 rounded-sm ">
            Delete Task
          </button>} 
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
  );
}
