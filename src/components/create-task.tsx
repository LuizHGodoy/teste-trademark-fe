import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskData: Task;
  handleUpdate: (name: string, value: string) => void;
}

export interface Task {
  uuid?: string;
  title: string;
  description: string;
  completed: boolean;
}

export const defaultTask: Task = {
  title: "",
  description: "",
  completed: false,
};

export function CreateTask({
  isOpen,
  onClose,
  taskData,
  handleUpdate,
}: ModalProps) {
  if (!isOpen) return null;

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    handleUpdate(e.target.name, e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(taskData);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova tarefa</DialogTitle>
        </DialogHeader>
        <Input
          name="title"
          placeholder="titulo da tarefa"
          value={taskData.title}
          onChange={handleChange}
        />
        <Textarea
          name="description"
          placeholder="descrição da tarefa"
          value={taskData.description}
          onChange={handleChange}
        />
        <Button className="rounded-full gap-2" onClick={handleSubmit}>
          <PlusIcon size={16} />
          Adicionar nova tarefa
        </Button>
      </DialogContent>
    </Dialog>
  );
}
