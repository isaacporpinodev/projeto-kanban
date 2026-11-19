import { useEffect, useState, type ReactNode } from "react";
import type { Task } from "../entities/Task";
import { taskService } from "../services/api";
import { TasksContext } from "./TasksContextDefinition";

interface TasksContextProviderProps {
  children: ReactNode;
}

export const TaskContextProvider: React.FC<TasksContextProviderProps> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  

  useEffect(() => {
    taskService.fetchTasks().then((data) => setTasks(data));
  },[]);

  const createTask = async (attributes: Omit<Task, "id">) =>{
    const newTask = await taskService.createTask(attributes)
    setTasks((currentState) =>  [...currentState, newTask])
  }

  const updateTask = async(id: number, attributes: Partial<Omit<Task, "id">>) =>{
    const updatedTask = await taskService.updateTask(id, attributes)
    setTasks((currentState) => currentState.map((task) =>
      task.id === id ? updatedTask : task
    ))
  }

  const deleteTask = async (id: number) => {
    await taskService.deleteTask(id)
    setTasks((currentStae) => currentStae.filter((task) => task.id !== id))
  }

  return (
  <TasksContext.Provider value={{tasks, createTask, updateTask, deleteTask}}>
    {children}
    </TasksContext.Provider>
    )
};
