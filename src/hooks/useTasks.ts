import { useContext } from "react";
import { TasksContext } from "../contexts/TasksContextDefinition";

export const useTasks = () => {
    return useContext(TasksContext)
}
