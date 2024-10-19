import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CreateTaskPayload } from "@/services/api/tasks";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type TaskListProps = {
  tasks: CreateTaskPayload[];
  onToggleComplete: (uuid?: string, completed?: boolean) => void;
  onEditTask: (task: CreateTaskPayload) => void;
  onDeleteTask: (task: CreateTaskPayload) => void;
  onAddTask: () => void;
};

export function TaskList({
  tasks,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onAddTask,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl">Ainda não há tarefas criadas 😢</p>
        <Button variant="outline" className="mt-4" onClick={onAddTask}>
          Criar primeira tarefa
        </Button>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.uuid}
          className="flex items-center justify-between p-4 border rounded-lg border-border bg-card hover:border-gray-500 hover:cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() =>
                onToggleComplete(task.uuid, task.completed)
              }
            />
            <span
              className={`${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
            >
              {task.title}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <DotsVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEditTask(task)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDeleteTask(task)}>
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      ))}
    </ul>
  );
}
