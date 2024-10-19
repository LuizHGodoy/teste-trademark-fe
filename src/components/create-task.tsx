import {
  CreateTaskPayload,
  createTask,
  updateTask,
} from "@/services/api/tasks";
import { DialogTitle } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { toast } from "react-toastify";
import { PrioritySelect } from "./priority-select";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskData: CreateTaskPayload;
  handleUpdate: (name: string, value: string) => void;
  isEditing: boolean;
  onTaskCreated: () => void;
}

export const defaultTask: CreateTaskPayload = {
  title: "",
  description: "",
  priority: "low",
};

export function CreateTask({
  isOpen,
  onClose,
  taskData,
  handleUpdate,
  isEditing,
  onTaskCreated,
}: ModalProps) {
  if (!isOpen) return null;

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    handleUpdate(e.target.name, e.target.value);
  }

  function handlePriorityChange(priority: string) {
    handleUpdate("priority", priority);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (isEditing && taskData.uuid) {
        await updateTask(taskData.uuid, taskData);
        toast.success("Tarefa atualizada com sucesso!");
      } else {
        await createTask(taskData);
        toast.success("Tarefa criada com sucesso!");
      }
      onTaskCreated();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
      toast.error("Erro ao salvar tarefa. Por favor, tente novamente.");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>
          {isEditing ? "Editar Tarefa" : "Criar Nova Tarefa"}
        </DialogTitle>
        <Input
          name="title"
          placeholder="Título da tarefa"
          value={taskData.title}
          onChange={handleChange}
        />
        <Textarea
          name="description"
          placeholder="Descrição da tarefa"
          value={taskData.description}
          onChange={handleChange}
          rows={10}
        />
        <PrioritySelect
          selectedPriority={taskData.priority}
          onPriorityChange={handlePriorityChange}
        />
        <Button className="rounded-full gap-2" onClick={handleSubmit}>
          <PlusIcon size={16} />
          {isEditing ? "Atualizar tarefa" : "Adicionar nova tarefa"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
