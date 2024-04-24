import { getUpcomingTasks } from '@/src/helper/api/getUpcomingTask.api';
import { useQuery } from '@tanstack/react-query';
import React, { ReactNode, createContext, useContext } from 'react';

interface Task{
    title: string;
    description: string;
    date: Date;
}

interface TaskProviderProps{
    children: ReactNode
}


interface TasksContextType {
  isLoading: boolean;
  isError: boolean;
  tasks: Task[] | null; // Define Task type according to your data structure
  error: any;
}

// Create a context with initial values
const TasksContext = createContext<TasksContextType>({
  isLoading: false,
  isError: false,
  tasks: null,
  error: null,
});

// Define your custom hook to access the context
export const useTasks = () => useContext(TasksContext);

// Provider component to wrap your app and provide the context value
export const TasksProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const {
    isLoading,
    isError,
    data: tasks,
    error,
  } = useQuery({
    queryKey: ["upcomingTasks"],
    queryFn: getUpcomingTasks,
  });

  return (
    <TasksContext.Provider value={{ isLoading, isError, tasks, error }}>
      {children}
    </TasksContext.Provider>
  );
};
