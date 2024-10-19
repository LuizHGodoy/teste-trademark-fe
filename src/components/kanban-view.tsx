import { CreateTaskPayload } from "@/services/api/tasks";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useCallback, useState } from "react";
import { KanbanColumn } from "./kanban-column";
import { KanbanTask } from "./kanban-task";

interface KanbanViewProps {
  tasks: CreateTaskPayload[];
  onTaskUpdate: (updatedTask: CreateTaskPayload) => void;
  onTaskDelete: (taskId: string) => void;
  openEditModal: (task: CreateTaskPayload) => void;
  openDeleteDialog: (task: CreateTaskPayload) => void;
}

export function KanbanView({
  tasks,
  onTaskUpdate,
  onTaskDelete,
  openEditModal,
  openDeleteDialog,
}: KanbanViewProps) {
  const [activeTask, setActiveTask] = useState<CreateTaskPayload | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const columns = ["ToDo", "In Progress", "Done", "Delete"];

  const getTasksByStatus = useCallback(
    (status: string) => {
      if (status === "Delete") return [];
      return tasks.filter((task) => {
        if (status === "Done") return task.completed;
        if (status === "In Progress")
          return !task.completed && task.priority === "high";
        return !task.completed && task.priority !== "high";
      });
    },
    [tasks],
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.uuid === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeColumnId = active.data.current?.sortable.containerId;
      const overColumnId = over.id;

      if (activeColumnId !== overColumnId) {
        console.log(
          `Movendo tarefa da coluna ${activeColumnId} para ${overColumnId}`,
        );
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeTask = tasks.find((t) => t.uuid === active.id);
      if (!activeTask) return;

      if (over.id === "Delete") {
        openDeleteDialog(activeTask);
      } else {
        let updatedTask = { ...activeTask };

        if (over.id === "Done") {
          updatedTask.completed = true;
          updatedTask.priority = "low";
        } else if (over.id === "In Progress") {
          updatedTask.completed = false;
          updatedTask.priority = "high";
        } else if (over.id === "ToDo") {
          updatedTask.completed = false;
          updatedTask.priority = "low";
        }

        onTaskUpdate(updatedTask);
      }
    }

    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex justify-center space-x-4 mt-16">
        {columns.map((column) => (
          <KanbanColumn
            key={column}
            id={column}
            title={column}
            tasks={getTasksByStatus(column)}
            onTaskEdit={openEditModal}
            onTaskDelete={onTaskDelete}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? (
          <KanbanTask task={activeTask} onEdit={openEditModal} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
