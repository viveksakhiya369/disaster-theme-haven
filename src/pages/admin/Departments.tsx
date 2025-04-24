
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DepartmentDialog } from "@/components/admin/DepartmentDialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
      // Update existing department
      setDepartments(prev =>
        prev.map(d => d.id === department.id ? department : d)
      );
      toast.success("Department updated successfully");
    } else {
      // Add new department
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

  return (
    <DashboardLayout>
      <Header
        title="Department Management"
        subtitle="Manage all department details"
      />

      <div className="p-4">
        <div className="flex justify-end mb-4">
          <Button
            onClick={() => {
              setSelectedDepartment(null);
              setIsDialogOpen(true);
            }}
          >
            <Plus />
            Add Department
          </Button>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell className="font-medium">{department.name}</TableCell>
                  <TableCell>{department.email}</TableCell>
                  <TableCell>{department.phone}</TableCell>
                  <TableCell>{department.address}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(department)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Department</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {department.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button
                              variant="destructive"
                              onClick={() => handleDelete(department.id)}
                            >
                              Delete
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

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
