"use client";

import { CreateTask, defaultTask } from "@/components/create-task";
import { DeleteTaskDialog } from "@/components/delete-task-dialog";
import { KanbanView } from "@/components/kanban-view";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/auth-context";
import {
  CreateTaskPayload,
  deleteTask,
  getAllTasks,
  updateTask,
} from "@/services/api/tasks";
import {
  DashboardIcon,
  DotsVerticalIcon,
  ExitIcon,
  HamburgerMenuIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { redirect, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export default function TaskManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<CreateTaskPayload[]>([]);
  const [editingTask, setEditingTask] = useState<CreateTaskPayload | null>(
    null,
  );
  const [currentTask, setCurrentTask] =
    useState<CreateTaskPayload>(defaultTask);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<CreateTaskPayload | null>(
    null,
  );
  const [isKanbanView, setIsKanbanView] = useState(false);
  const router = useRouter();

  const { isAuthenticated, user, logout } = useAuth();

  const addTask = () => {
    setCurrentTask(defaultTask);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleUpdate = (name: string, value: string) => {
    setCurrentTask((prev) => ({ ...prev, [name]: value }));
  };

  const openEditModal = (task: CreateTaskPayload) => {
    setCurrentTask(task);
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleTaskCreatedOrUpdated = () => {
    getTasks();
    setEditingTask(null);
    setCurrentTask(defaultTask);
  };

  const getTasks = async () => {
    const tasks = await getAllTasks();
    setTasks(tasks);
  };

  const openDeleteDialog = (task: CreateTaskPayload) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setTaskToDelete(null);
    setDeleteDialogOpen(false);
  };

  const confirmDeleteTask = async () => {
    if (taskToDelete && taskToDelete.uuid) {
      await handleDeleteTask(taskToDelete.uuid);
      closeDeleteDialog();
    }
  };

  const handleDeleteTask = async (uuid: string) => {
    try {
      await deleteTask(uuid);
      setTasks(tasks.filter((task) => task.uuid !== uuid));
      toast.success("Tarefa excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
      toast.error("Erro ao excluir tarefa. Por favor, tente novamente.");
    }
  };

  const toggleComplete = async (uuid?: string, completed?: boolean) => {
    if (!uuid) return;

    try {
      const updatedTask = await updateTask(uuid, { completed: !completed });
      setTasks(
        tasks.map((task) =>
          task.uuid === uuid
            ? { ...task, completed: updatedTask.completed }
            : task,
        ),
      );
      toast.info(
        `Tarefa "${updatedTask.title}" marcada como ${updatedTask.completed ? "concluída" : "não concluída"}.`,
      );
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
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

    getTasks();
  }, []);

  const toggleView = () => {
    setIsKanbanView(!isKanbanView);
  };

  const handleTaskUpdate = useCallback(
    async (updatedTask: CreateTaskPayload) => {
      try {
        const response = await updateTask(updatedTask.uuid!, updatedTask);
        setTasks(
          tasks.map((task) =>
            task.uuid === updatedTask.uuid ? response : task,
          ),
        );
        toast.success("Tarefa atualizada com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
      }
    },
    [tasks],
  );

  const handleTaskEdit = useCallback((task: CreateTaskPayload) => {
    setCurrentTask(task);
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-[1400px] bg-background text-foreground m-auto">
      <div className="flex-grow">
        <div className="flex items-center justify-between mt-16">
          <div className="">
            <h1 className="text-2xl font-bold">Gerenciador de Tarefas</h1>
            {user && <h2 className="text-lg">Bem-vindo, {user.name}! 👋</h2>}
            <p className="text-gray-600">{getCurrentDate()}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex space-x-4 ">
              <Button
                variant={"secondary"}
                className="rounded-full gap-2"
                onClick={addTask}
              >
                <PlusIcon />
                Adicionar nova tarefa
              </Button>
              <Button variant={"secondary"} onClick={toggleView}>
                {isKanbanView ? <HamburgerMenuIcon /> : <DashboardIcon />}
              </Button>
            </div>
            <Button variant={"ghost"} className="gap-2" onClick={handleLogout}>
              <ExitIcon />
              Sair
            </Button>
          </div>
        </div>

        {isKanbanView ? (
          <KanbanView
            tasks={tasks}
            onTaskUpdate={handleTaskUpdate}
            onTaskDelete={handleDeleteTask}
            openEditModal={openEditModal}
            openDeleteDialog={openDeleteDialog}
          />
        ) : (
          <div className="max-w-[900px] mt-16 m-auto">
            {tasks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xl">Ainda não há tarefas criadas 😢</p>
                <Button variant="outline" className="mt-4" onClick={addTask}>
                  Criar primeira tarefa
                </Button>
              </div>
            ) : (
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
                          toggleComplete(task.uuid, task.completed)
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
                        <DropdownMenuItem onClick={() => openEditModal(task)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(task)}
                        >
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <CreateTask
          taskData={currentTask}
          isOpen={isModalOpen}
          handleUpdate={handleUpdate}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
            setCurrentTask(defaultTask);
          }}
          isEditing={!!editingTask}
          onTaskCreated={handleTaskCreatedOrUpdated}
        />
        <DeleteTaskDialog
          isOpen={deleteDialogOpen}
          onClose={closeDeleteDialog}
          onConfirm={confirmDeleteTask}
          taskTitle={taskToDelete?.title || ""}
        />
      </div>

      <footer className="mt-auto ">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="text-muted-foreground">
            Desenvolvido com 💖 e ☕ por Luiz Godoy
          </p>
        </div>
      </footer>
    </div>
  );
}
