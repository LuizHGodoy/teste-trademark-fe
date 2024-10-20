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
    <div className="flex flex-col space-y-4 mt-4 px-4 sm:px-0">
      <div className="flex justify-between items-center">
        <h1 className="text-lg sm:text-xl font-bold">Gerenciador de Tarefas</h1>
        <Button variant="ghost" size="sm" onClick={onLogout}>
          <ExitIcon className="mr-2" />
          <span className="hidden sm:inline">Sair</span>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-sm sm:text-base">Bem-vindo, {userName}! 👋</h2>
          <p className="text-xs sm:text-sm text-gray-600">{getCurrentDate()}</p>
        </div>

        <div className="flex mt-2 sm:mt-0 space-x-2 w-full sm:w-auto">
          <Button
            variant="secondary"
            size="sm"
            className="flex-grow sm:flex-grow-0"
            onClick={onAddTask}
          >
            <PlusIcon className="mr-1" />
            <span className="text-xs sm:text-sm">Nova tarefa</span>
          </Button>
          <div className="hidden md:block">
            <Button variant="secondary" size="sm" onClick={onToggleView}>
              {isKanbanView ? <HamburgerMenuIcon /> : <DashboardIcon />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
