"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "react-toastify";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), title: newTask, completed: false },
      ]);
      setNewTask("");
      toast.success("Tarefa adicionada com sucesso!");
    } else {
      toast.error("Por favor, insira um título para a tarefa.");
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Tarefa excluída com sucesso!");
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
    const task = tasks.find((t) => t.id === id);
    if (task) {
      toast.info(
        `Tarefa "${task.title}" marcada como ${!task.completed ? "concluída" : "não concluída"}.`,
      );
    }
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setNewTask(task.title);
  };

  const saveEdit = () => {
    if (editingTask) {
      if (newTask.trim()) {
        setTasks(
          tasks.map((task) =>
            task.id === editingTask.id ? { ...task, title: newTask } : task,
          ),
        );
        setEditingTask(null);
        setNewTask("");
        toast.success("Tarefa atualizada com sucesso!");
      } else {
        toast.error("Por favor, insira um título para a tarefa.");
      }
    }
  };

  return (
    <Card className="w-full max-w-3xl bg-background text-foreground">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Gerenciador de Tarefas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Nova tarefa"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-grow"
          />
          {editingTask ? (
            <Button onClick={saveEdit}>Salvar</Button>
          ) : (
            <Button onClick={addTask}>Adicionar</Button>
          )}
        </div>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
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
                  onClick={() => toggleComplete(task.id)}
                >
                  {task.completed ? "Desfazer" : "Concluir"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => startEditing(task)}
                >
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                >
                  Excluir
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
