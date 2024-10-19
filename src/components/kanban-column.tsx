import { CreateTaskPayload } from "@/services/api/tasks";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanbanTask } from "./kanban-task";

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: CreateTaskPayload[];
  onTaskEdit: (task: CreateTaskPayload) => void;
  onTaskDelete: (taskId: string) => void;
}

export function KanbanColumn({
  id,
  title,
  tasks,
  onTaskEdit,
  onTaskDelete,
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  const isDeleteColumn = id === "Delete";

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-lg ${isDeleteColumn ? "w-1/6 bg-red-900" : "w-1/4 bg-background border border-border "}`}
    >
      {!isDeleteColumn && (
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          {title}
        </h2>
      )}

      <SortableContext
        id={id}
        items={tasks.map((task) => task.uuid!)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className={`space-y-2 ${isDeleteColumn ? "min-h-[100px] border-2 border-dashed border-red-500 rounded-lg flex items-center justify-center" : ""}`}
        >
          {isDeleteColumn ? (
            <p className="text-red-500">Arraste aqui para excluir</p>
          ) : (
            tasks.map((task) => (
              <KanbanTask key={task.uuid} task={task} onEdit={onTaskEdit} />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}
