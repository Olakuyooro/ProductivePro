import { getTasks } from '@/src/helper/api/getTask.api';
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


interface TodayTasksContextType {
  isLoading: boolean;
  isError: boolean;
  todayTasks: Task[] | null; // Define Task type according to your data structure
  error: any;
}

// Create a context with initial values
const TodayTasksContext = createContext<TodayTasksContextType>({
  isLoading: false,
  isError: false,
  todayTasks: null,
  error: null,
});

// Define your custom hook to access the context
export const useTodayTasks = () => useContext(TodayTasksContext);

// Provider component to wrap your app and provide the context value
export const TodayTasksProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const {
    isLoading,
    isError,
    data: todayTasks,
    error,
  } = useQuery({
    queryKey: ["TodayTasks"],
    queryFn: getTasks,
  });

  return (
    <TodayTasksContext.Provider value={{ isLoading, isError, todayTasks, error }}>
      {children}
    </TodayTasksContext.Provider>
  );
};
