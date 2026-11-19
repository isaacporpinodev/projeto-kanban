import { Badge, Flex, Grid, ScrollArea, Text } from "@radix-ui/themes";
import type { Task } from "../entities/Task";
import { TaskCard } from "./TaskCard";
import { useTasks } from "../hooks/useTasks";

export const TaskBoard = () => {
  const { tasks } = useTasks()

  const taskTodo: Task[] = tasks.filter((task) => task.status === "todo");
  const taskInProgress: Task[] = tasks.filter((task) => task.status === "doing");
  const taskDone: Task[] = tasks.filter((task) => task.status === "done");

  return (
    <ScrollArea scrollbars="horizontal">
      <Grid columns={"3"} gap={"4"} minWidth={"64rem"}>
        <Flex direction={"column"} gap={"4"}>
          <Badge size={"3"} color="gray">
            Pra Fazer ({taskTodo.length})
          </Badge>

          {taskTodo.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {taskTodo.length === 0 && <Text className="empty-column">Nenhuma tarefa por aqui.</Text>}
        </Flex>

        <Flex direction={"column"} gap={"4"}>
          <Badge size={"3"} color="yellow">
            Em progresso ({taskInProgress.length})
          </Badge>

          {taskInProgress.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {taskInProgress.length === 0 && <Text className="empty-column">Nenhuma tarefa por aqui.</Text>}
        </Flex>

        <Flex direction={"column"} gap={"4"}>
          <Badge size={"3"} color="green">
            Concluido ({taskDone.length})
          </Badge>

          {taskDone.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {taskDone.length === 0 && <Text className="empty-column">Nenhuma tarefa por aqui.</Text>}
        </Flex>
      </Grid>
    </ScrollArea>
  );
};
