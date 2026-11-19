import { TaskFormDialog } from "./components/TaskFormDialog";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { TaskBoard } from "./components/TaskBoard";
import { TaskContextProvider } from "./contexts/TasksContext";

function App() {
  return (
    <TaskContextProvider>
      <Box maxWidth="80rem" mx="auto">
        <Box height="4rem" px="4" className="app-header">
          <Flex align="center" gap="4" height="100%">
            <Heading size="8" weight="light">
              React Kanban
            </Heading>
              <TaskFormDialog />
          </Flex>
        </Box>

        <Box px="4" maxWidth="80rem" mx="auto">
          <h2 className="mb-3">Quadro de tarefas</h2>
          <TaskBoard />
        </Box>
      </Box>
    </TaskContextProvider>
  );
}

export default App;
