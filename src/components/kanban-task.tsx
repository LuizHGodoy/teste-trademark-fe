import { CreateTaskPayload } from "@/services/api/tasks";

import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { useEffect, useState } from "react";

interface KanbanTaskProps {
  task: CreateTaskPayload;

  onEdit: (task: CreateTaskPayload) => void;
}

export function KanbanTask({ task, onEdit }: KanbanTaskProps) {
  const [isDoubleClick, setIsDoubleClick] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.uuid! });

  const style = {
    transform: CSS.Transform.toString(transform),

    transition,
  };

  const handleClick = () => {
    setIsDoubleClick(true);

    setTimeout(() => setIsDoubleClick(false), 300);
  };

  useEffect(() => {
    if (isDoubleClick) {
      onEdit(task);
    }
  }, [isDoubleClick, task, onEdit]);

  const renderPriorityEmoji = (priority: string) => {
    switch (priority) {
      case "Baixa":
        return "🔥";

      case "Média":
        return "🔥🔥";

      case "Alta":
        return "🔥🔥🔥";

      case "Urgente":
        return "🔥🔥🔥🔥";

      case "Chefe chegou com duas pizzas":
        return "🔥🔥🔥🔥🔥";

      default:
        return "";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`border bg-background p-2 rounded shadow cursor-pointer ${task.completed ? "border-green-500" : "border-border"}`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-foreground">{task.title}</h3>

        <span>{renderPriorityEmoji(task.priority)}</span>
      </div>

      <p className="text-sm text-foreground">{task.description}</p>

      {task.completed && <p className="text-xs text-foreground">Concluída</p>}
    </div>
  );
}
