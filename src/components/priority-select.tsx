"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const priorities = [
  { value: "baixa", label: "Baixa" },
  { value: "média", label: "Média" },
  { value: "alta", label: "Alta" },
  { value: "urgente", label: "Urgente" },
  { value: "chefe chegou com duas pizzas", label: "Chefe com pizzas" },
];

interface PrioritySelectProps {
  selectedPriority?: string;
  onPriorityChange: (priority: string) => void;
}

export function PrioritySelect({
  selectedPriority,
  onPriorityChange,
}: PrioritySelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (priority: string) => {
    onPriorityChange(priority); // Chama a função passada como prop
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selectedPriority || "Selecione a prioridade"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        {priorities.map((priority) => (
          <div
            key={priority.value}
            onClick={() => handleSelect(priority.value)}
            className="flex items-center cursor-pointer p-2"
          >
            <Check
              className={`mr-2 h-4 w-4 ${
                selectedPriority === priority.value
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
            {priority.label}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
