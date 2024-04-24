import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosAdd } from "react-icons/io";
import SideBar from "../../shared/SideBar";
import { getTasks } from "@/src/helper/api/getTask.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddTask } from "@/src/helper/api/addTask.api";
import TaskLayout from "../../shared/TaskLayout";
import { getIndividualTask } from "@/src/helper/api/getIndividualTask.api";
import axios from "axios";
import { UpdateTask } from "@/src/helper/api/updateTask.api";
import GeneralLayout from "../../shared/GeneralLayout";
import TaskDisplay from "../../shared/TaskDisplay";

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

export default function LandingPage() {
 
  return (
    <GeneralLayout>
    <TaskDisplay/>
    </GeneralLayout>
  );
}
