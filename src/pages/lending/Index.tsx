
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LendingTable from "@/components/lending/LendingTable";
import LendingForm from "@/components/lending/LendingForm";
import LendingSummary from "@/components/lending/LendingSummary";
import { LendingItem } from "@/types/lending";
import { Plus, Download, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const LendingPage = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [lendingItems, setLendingItems] = useState<LendingItem[]>([
    {
      id: "LD-001",
      itemName: "Emergency Generator",
      itemType: "Equipment",
      borrower: "North District Fire Department",
      borrowerContact: "+1-555-123-4567",
      quantity: 2,
      lendDate: "2023-08-15T09:00:00Z",
      expectedReturnDate: "2023-08-30T09:00:00Z",
      status: "Active"
    },
    {
      id: "LD-002",
      itemName: "Medical Supply Kit",
      itemType: "Supplies",
      borrower: "Red Cross Response Team",
      borrowerContact: "+1-555-987-6543",
      quantity: 10,
      lendDate: "2023-08-10T10:30:00Z",
      expectedReturnDate: "2023-09-10T10:30:00Z",
      status: "Active"
    },
    {
      id: "LD-003",
      itemName: "Water Purification System",
      itemType: "Equipment",
      borrower: "Community Relief Center",
      borrowerContact: "+1-555-456-7890",
      quantity: 3,
      lendDate: "2023-07-28T14:00:00Z",
      expectedReturnDate: "2023-08-28T14:00:00Z",
      status: "Active"
    },
    {
      id: "LD-004",
      itemName: "Emergency Tent",
      itemType: "Shelter",
      borrower: "Southside Evacuation Center",
      borrowerContact: "+1-555-789-0123",
      quantity: 15,
      lendDate: "2023-08-01T08:15:00Z",
      expectedReturnDate: "2023-09-01T08:15:00Z",
      status: "Returned",
      actualReturnDate: "2023-08-25T16:30:00Z"
    },
    {
      id: "LD-005",
      itemName: "Communication Radio",
      itemType: "Equipment",
      borrower: "Mountain Rescue Team",
      borrowerContact: "+1-555-234-5678",
      quantity: 8,
      lendDate: "2023-07-20T11:00:00Z",
      expectedReturnDate: "2023-08-20T11:00:00Z",
      status: "Overdue"
    }
  ]);

  const handleAddItem = (item: LendingItem) => {
    setLendingItems([...lendingItems, { ...item, id: `LD-00${lendingItems.length + 1}` }]);
    setShowForm(false);
    toast({
      title: "Item Added Successfully",
      description: `${item.itemName} has been added to the lending system.`,
    });
  };

  const handleUpdateStatus = (id: string, status: string) => {
    setLendingItems(
      lendingItems.map((item) =>
        item.id === id
          ? { 
              ...item, 
              status, 
              actualReturnDate: status === "Returned" ? new Date().toISOString() : item.actualReturnDate 
            }
          : item
      )
    );
    toast({
      title: "Status Updated",
      description: `Item ${id} status changed to ${status}.`,
    });
  };

  return (
    <DashboardLayout>
      <Header 
        title="Resource Lending" 
        subtitle="Track and manage equipment and resources on loan during disaster response" 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <LendingSummary 
          totalItems={lendingItems.length}
          activeLoans={lendingItems.filter(item => item.status === "Active").length}
          overdueLoans={lendingItems.filter(item => item.status === "Overdue").length}
        />
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Lending Operations</h2>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
            <Button className="gap-2" onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </div>
        </div>

        {showForm && (
          <Card className="mb-6 border border-border/40 animate-fade-in">
            <CardHeader>
              <CardTitle>Add New Lending Item</CardTitle>
              <CardDescription>Record a new item being lent out during disaster operations</CardDescription>
            </CardHeader>
            <CardContent>
              <LendingForm onSubmit={handleAddItem} onCancel={() => setShowForm(false)} />
            </CardContent>
          </Card>
        )}

        <Card className="border border-border/40">
          <CardHeader className="pb-4">
            <CardTitle>Resource Lending Register</CardTitle>
            <CardDescription>Track all equipment and supplies currently on loan</CardDescription>
          </CardHeader>
          <CardContent>
            <LendingTable items={lendingItems} onUpdateStatus={handleUpdateStatus} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LendingPage;
