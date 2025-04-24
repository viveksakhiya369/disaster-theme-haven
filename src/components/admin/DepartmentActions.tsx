
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface DepartmentActionsProps {
  onAdd: () => void;
}

export function DepartmentActions({ onAdd }: DepartmentActionsProps) {
  return (
    <div className="flex justify-end mb-4">
      <Button onClick={onAdd}>
        <Plus />
        Add Department
      </Button>
    </div>
  );
}
