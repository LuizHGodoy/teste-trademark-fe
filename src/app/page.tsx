"use client";

import { CreateTask, defaultTask } from "@/components/create-task";
import { DeleteTaskDialog } from "@/components/delete-task-dialog";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { KanbanView } from "@/components/kanban-view";
import { TaskList } from "@/components/task-list";
import { useAuth } from "@/context/auth-context";
import {
  CreateTaskPayload,
  deleteTask,
  getAllTasks,
  updateTask,
} from "@/services/api/tasks";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const LoadingComponent = () => <div>Carregando...</div>;

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
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const router = useRouter();

  const getTasks = async () => {
    const fetchedTasks = await getAllTasks();
    setTasks(fetchedTasks);
  };

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

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      getTasks();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen w-full max-w-[1400px] bg-background text-foreground m-auto px-4 sm:px-6 lg:px-8">
      <div className="flex-grow">
        <Header
          userName={user?.name || ""}
          isKanbanView={isKanbanView}
          onAddTask={addTask}
          onToggleView={toggleView}
          onLogout={handleLogout}
        />

        {isKanbanView ? (
          <div className="mt-8 overflow-x-auto">
            <KanbanView
              tasks={tasks}
              onTaskUpdate={handleTaskUpdate}
              onTaskDelete={handleDeleteTask}
              openEditModal={openEditModal}
              openDeleteDialog={openDeleteDialog}
            />
          </div>
        ) : (
          <div className="max-w-[900px] mt-8 sm:mt-16 mx-auto">
            <TaskList
              tasks={tasks}
              onToggleComplete={toggleComplete}
              onEditTask={openEditModal}
              onDeleteTask={openDeleteDialog}
              onAddTask={addTask}
            />
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

      <Footer />
    </div>
  );
}
