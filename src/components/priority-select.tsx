import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

enum Priority {
  Light = "light",
  Dark = "dark",
  System = "system",
}

export function PrioritySelect() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={Priority.Light}>Light</SelectItem>
        <SelectItem value={Priority.Dark}>Dark</SelectItem>
        <SelectItem value={Priority.System}>System</SelectItem>
      </SelectContent>
    </Select>
  );
}
