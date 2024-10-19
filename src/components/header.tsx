import { Button } from "@/components/ui/button";
import {
  DashboardIcon,
  ExitIcon,
  HamburgerMenuIcon,
  PlusIcon,
} from "@radix-ui/react-icons";

type HeaderProps = {
  userName: string;
  isKanbanView: boolean;
  onAddTask: () => void;
  onToggleView: () => void;
  onLogout: () => void;
};

export function Header({
  userName,
  isKanbanView,
  onAddTask,
  onToggleView,
  onLogout,
}: HeaderProps) {
  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date().toLocaleDateString("pt-BR", options);
  };

  return (
    <div className="flex items-center justify-between mt-16">
      <div className="">
        <h1 className="text-2xl font-bold">Gerenciador de Tarefas</h1>
        <h2 className="text-lg">Bem-vindo, {userName}! 👋</h2>
        <p className="text-gray-600">{getCurrentDate()}</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex space-x-4 ">
          <Button
            variant={"secondary"}
            className="rounded-full gap-2"
            onClick={onAddTask}
          >
            <PlusIcon />
            Adicionar nova tarefa
          </Button>
          <Button variant={"secondary"} onClick={onToggleView}>
            {isKanbanView ? <HamburgerMenuIcon /> : <DashboardIcon />}
          </Button>
        </div>
        <Button variant={"ghost"} className="gap-2" onClick={onLogout}>
          <ExitIcon />
          Sair
        </Button>
      </div>
    </div>
  );
}
