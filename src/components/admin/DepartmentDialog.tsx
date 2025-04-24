
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Department {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface DepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department: Department | null;
  onSave: (department: Department) => void;
}

export function DepartmentDialog({
  open,
  onOpenChange,
  department,
  onSave,
}: DepartmentDialogProps) {
  const [formData, setFormData] = useState<Omit<Department, 'id'>>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name,
        email: department.email,
        phone: department.phone,
        address: department.address,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    }
  }, [department]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: department?.id || "",
      ...formData,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {department ? "Edit Department" : "Add New Department"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Department Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
