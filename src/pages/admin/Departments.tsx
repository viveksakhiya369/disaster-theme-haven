
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { DepartmentDialog } from "@/components/admin/DepartmentDialog";
import { DepartmentTable } from "@/components/admin/DepartmentTable";
import { DepartmentActions } from "@/components/admin/DepartmentActions";
import { toast } from "sonner";

interface Department {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Mock data for departments
const initialDepartments: Department[] = [
  {
    id: "1",
    name: "Fire Department",
    email: "fire@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, City",
  },
  {
    id: "2",
    name: "Police Department",
    email: "police@example.com",
    phone: "(555) 234-5678",
    address: "456 Oak Ave, City",
  },
];

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = (department: Department) => {
    if (selectedDepartment) {
      setDepartments(prev =>
        prev.map(d => d.id === department.id ? department : d)
      );
      toast.success("Department updated successfully");
    } else {
      const newDepartment = {
        ...department,
        id: Math.random().toString(36).substr(2, 9),
      };
      setDepartments(prev => [...prev, newDepartment]);
      toast.success("Department created successfully");
    }
    setIsDialogOpen(false);
    setSelectedDepartment(null);
  };

  const handleDelete = (id: string) => {
    setDepartments(prev => prev.filter(d => d.id !== id));
    toast.success("Department deleted successfully");
  };

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedDepartment(null);
    setIsDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <Header
        title="Department Management"
        subtitle="Manage all department details"
      />

      <div className="p-4">
        <DepartmentActions onAdd={handleAdd} />
        <DepartmentTable
          departments={departments}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <DepartmentDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          department={selectedDepartment}
          onSave={handleSave}
        />
      </div>
    </DashboardLayout>
  );
};

export default DepartmentsPage;
