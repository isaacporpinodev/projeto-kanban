import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Badge, Box, Button, Dialog, Flex, RadioGroup, Text, TextArea, TextField } from "@radix-ui/themes";
import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import type { Task } from "../entities/Task";
import { useTasks } from "../hooks/useTasks";

const TaskSchema = z.object({
  title: z.string().trim().min(1, "Informe um título"),
  description: z.string().trim().min(1, "Informe uma descrição"),
  status: z.enum(["todo", "doing", "done"]),
  priority: z.enum(["low", "medium", "high"]),
});

interface TaskFormDialogProps {
  task?: Task;
  compact?: boolean;
}

export const TaskFormDialog = ({ task, compact = false }: TaskFormDialogProps) => {
  const { createTask, updateTask } = useTasks();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      const formData = new FormData(event.currentTarget);
      const taskData = TaskSchema.parse({
        title: formData.get("title"),
        description: formData.get("description"),
        status: formData.get("status"),
        priority: formData.get("priority"),
      });

      if (task) await updateTask(task.id, taskData);
      else await createTask(taskData);
      setOpen(false);
    } catch (submitError) {
      console.error("Erro ao salvar tarefa:", submitError);
      setError(
        submitError instanceof z.ZodError
          ? "Confira o título, a descrição, a situação e a prioridade da tarefa."
          : submitError instanceof Error
            ? submitError.message
            : "Não foi possível salvar a tarefa. Confira se a API está rodando."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(nextOpen) => {
      setOpen(nextOpen);
      if (nextOpen) setError("");
    }}>
      <Dialog.Trigger>
        {compact ? (
          <Button type="button" variant="ghost" color="gray" className="edit-task-button" aria-label={`Editar ${task?.title}`} title="Editar tarefa">
            <Pencil1Icon />
          </Button>
        ) : (
          <Button type="button"><PlusIcon /> Nova tarefa</Button>
        )}
      </Dialog.Trigger>
      <Dialog.Content maxWidth="32rem">
        <Dialog.Title>{task ? "Editar tarefa" : "Nova tarefa"}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {task ? "Atualize os dados da tarefa." : "Adicione uma tarefa ao quadro."}
        </Dialog.Description>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            <Box>
              <Text as="label" htmlFor="task-title" mb="2" size="2">Título</Text>
              <TextField.Root id="task-title" name="title" placeholder="Defina um título" defaultValue={task?.title} required />
            </Box>
            <Box>
              <Text as="label" htmlFor="task-description" mb="2" size="2">Descrição</Text>
              <TextArea id="task-description" name="description" placeholder="Descreva a tarefa" defaultValue={task?.description} required />
            </Box>
            <Flex gap="8" wrap="wrap">
              <Box>
                <Text as="div" mb="2" size="2">Situação</Text>
                <RadioGroup.Root name="status" defaultValue={task?.status ?? "todo"}>
                  <RadioGroup.Item value="todo"><Badge color="gray">Para fazer</Badge></RadioGroup.Item>
                  <RadioGroup.Item value="doing"><Badge color="yellow">Em progresso</Badge></RadioGroup.Item>
                  <RadioGroup.Item value="done"><Badge color="green">Concluído</Badge></RadioGroup.Item>
                </RadioGroup.Root>
              </Box>
              <Box>
                <Text as="div" mb="2" size="2">Prioridade</Text>
                <RadioGroup.Root name="priority" defaultValue={task?.priority ?? "low"}>
                  <RadioGroup.Item value="low"><Badge color="sky">Baixa</Badge></RadioGroup.Item>
                  <RadioGroup.Item value="medium"><Badge color="amber">Média</Badge></RadioGroup.Item>
                  <RadioGroup.Item value="high"><Badge color="tomato">Alta</Badge></RadioGroup.Item>
                </RadioGroup.Root>
              </Box>
            </Flex>
            {error && <Text role="alert" color="red" size="2">{error}</Text>}
            <Flex gap="2" justify="end">
              <Dialog.Close><Button type="button" color="gray" variant="soft">Cancelar</Button></Dialog.Close>
              <Button type="submit" disabled={saving}>{saving ? "Salvando..." : task ? "Salvar alterações" : "Criar tarefa"}</Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
