
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import LendingForm from "@/components/lending/LendingForm";
import LendingTable from "@/components/lending/LendingTable";
import LendingSummary from "@/components/lending/LendingSummary";

interface LendingItem {
  id: string;
  itemName: string;
  itemType: string;
  borrower: string;
  borrowerContact: string;
  quantity: number;
  lendDate: string;
  expectedReturnDate: string;
  status: "Active" | "Returned" | "Overdue" | "Lost";
  actualReturnDate?: string;
  notes?: string;
}

const LendingPage = () => {
  const [items, setItems] = useState<LendingItem[]>([
    {
      id: "LEND-001",
      itemName: "Portable Generator",
      itemType: "Equipment",
      borrower: "Fire Station 3",
      borrowerContact: "station3@example.com",
      quantity: 1,
      lendDate: "2023-06-01",
      expectedReturnDate: "2023-06-15",
      status: "Active",
      notes: "For emergency power backup"
    },
    {
      id: "LEND-002",
      itemName: "Medical Supplies Kit",
      itemType: "Supplies",
      borrower: "Community Hospital",
      borrowerContact: "supplies@hospital.org",
      quantity: 3,
      lendDate: "2023-05-28",
      expectedReturnDate: "2023-06-10",
      status: "Overdue",
      notes: "Standard emergency kits"
    },
    {
      id: "LEND-003",
      itemName: "Water Pumps",
      itemType: "Equipment",
      borrower: "Public Works Dept",
      borrowerContact: "operations@publicworks.gov",
      quantity: 2,
      lendDate: "2023-05-15",
      expectedReturnDate: "2023-05-30",
      status: "Returned",
      actualReturnDate: "2023-05-29",
      notes: "Used for flood mitigation"
    }
  ]);

  const addItem = (item: Omit<LendingItem, "id">) => {
    const newItem: LendingItem = {
      ...item,
      id: `LEND-${String(items.length + 1).padStart(3, '0')}`,
    };
    setItems([...items, newItem]);
  };

  const updateItemStatus = (id: string, status: "Active" | "Returned" | "Overdue" | "Lost", actualReturnDate?: string) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, status, actualReturnDate } 
        : item
    ));
  };

  return (
    <DashboardLayout>
      <Header 
        title="Resource Lending" 
        subtitle="Track and manage equipment and supplies lending"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <LendingForm onSubmit={addItem} />
        </div>
        <div>
          <LendingSummary items={items} />
        </div>
      </div>
      
      <div>
        <LendingTable items={items} onUpdateStatus={updateItemStatus} />
      </div>
    </DashboardLayout>
  );
};

export default LendingPage;
