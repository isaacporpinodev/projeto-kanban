import { ArrowDownIcon } from "@radix-ui/react-icons";
import { Badge, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import type { Task, TaskPriority } from "../entities/Task";
import { useTasks } from "../hooks/useTasks";
import { TaskFormDialog } from "./TaskFormDialog";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const {deleteTask, updateTask} = useTasks()

  const getPriorityColor = (priority: TaskPriority) => {
    const priorityColors: { [key: string]: "sky" | "amber" | "tomato" } = {
      low: "sky",
      medium: "amber",
      high: "tomato",
    };
    return priorityColors[priority];
  };

  const handleDelete = (id: number) => {
    const confirmation = confirm("Tem certeza que deseja excluir essa tarefa?")
    if(confirmation){
      deleteTask(id)
    }

  }

  const handleUpdate = () => {
    if(task.status === "todo"){
      updateTask(task.id, {status: "doing"})
    }else if(task.status === "doing"){
      updateTask(task.id, {status: "done"})
    }
  }

  const handleMoveBack = () => {
    updateTask(task.id, { status: task.status === "done" ? "doing" : "todo" });
  };

  return (
    <Card>
      <Flex align="start" justify="between" gap="3">
        <Heading as="h3" size="3" className="task-title">
          {task.title}
        </Heading>
        <Flex align="center" gap="2" className="task-card-actions">
          <Badge color={getPriorityColor(task.priority)}>{task.priority}</Badge>
          <TaskFormDialog task={task} compact />
        </Flex>
      </Flex>

      <Text as="p" my={"4"}>
        {task.description}
      </Text>

      <Flex gap="2" wrap="wrap">
        {task.status !== "todo" && (
          <Button variant="soft" color="gray" onClick={handleMoveBack}>
            <ArrowDownIcon /> {task.status === "done" ? "Voltar para progresso" : "Voltar para fazer"}
          </Button>
        )}
        {task.status !== "done" && (
          <Button color={task.status === "todo" ? "indigo" : "green"} onClick={handleUpdate}>
            {task.status === "todo" ? "Iniciar" : "Concluir"}
          </Button>
        )}
        <Button color="red" onClick={() => handleDelete(task.id)}>Excluir</Button>
      </Flex>
    </Card>
  );
};
