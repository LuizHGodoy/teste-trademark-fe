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
      console.log("Double click");
      onEdit(task);
    }
  }, [isDoubleClick, task, onEdit]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border border-border bg-background p-2 rounded shadow cursor-pointer"
      onClick={handleClick}
    >
      <h3 className="font-semibold text-foreground">{task.title}</h3>
      <p className="text-sm text-foreground">{task.description}</p>
    </div>
  );
}
