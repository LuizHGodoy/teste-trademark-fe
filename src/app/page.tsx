"use client";

import { CreateTask, Task, defaultTask } from "@/components/create-task";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { BanIcon, PlusIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TaskManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>(defaultTask);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { isAuthenticated, user } = useAuth();

  const addTask = () => {
    setIsModalOpen(true);
  };

  const handleUpdate = (name: string, value: string) => {
    if (!name) return;

    setNewTask({ ...newTask, [name]: value });
  };

  const deleteTask = (uuid?: string) => {
    if (!uuid) return;

    setTasks(tasks.filter((task) => task.uuid !== uuid));
    toast.success("Tarefa excluída com sucesso!");
  };

  const toggleComplete = (uuid?: string) => {
    if (!uuid) return;

    setTasks(
      tasks.map((task) =>
        task.uuid === uuid ? { ...task, completed: !task.completed } : task,
      ),
    );
    const task = tasks.find((t) => t.uuid === uuid);
    if (task) {
      toast.info(
        `Tarefa "${task.title}" marcada como ${!task.completed ? "concluída" : "não concluída"}.`,
      );
    }
  };

  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date().toLocaleDateString("pt-BR", options);
  };

  useEffect(() => {
    if (!isAuthenticated) redirect("/sign-in");
  }, []);

  return (
    <div className="w-full max-w-[1400px] bg-background text-foreground m-auto">
      <div className="flex items-center justify-between mt-16">
        <div className="">
          <h1 className="text-2xl font-bold">Gerenciador de Tarefas</h1>
          {user && <h2 className="text-lg">Bem-vindo, {user.name}! 👋</h2>}
          <p className="text-gray-600">{getCurrentDate()}</p>
        </div>

        <div className="">
          <div className="flex space-x-4 ">
            <Button
              variant={"secondary"}
              className="rounded-full gap-2"
              onClick={addTask}
            >
              <PlusIcon size={16} />
              Adicionar nova tarefa
            </Button>
            <Button onClick={addTask}>
              <BanIcon />
            </Button>
          </div>
        </div>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.uuid}
            className="flex items-center justify-between p-2 border rounded border-border bg-card"
          >
            <span
              className={`${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
            >
              {task.title}
            </span>
            <div>
              <Button
                variant="outline"
                size="sm"
                className="mr-2"
                onClick={() => toggleComplete(task.uuid)}
              >
                {task.completed ? "Desfazer" : "Concluir"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="mr-2"
                onClick={() => setEditingTask(task)}
              >
                Editar
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteTask(task.uuid)}
              >
                Excluir
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <CreateTask
        taskData={newTask}
        isOpen={isModalOpen}
        handleUpdate={handleUpdate}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
