import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Header from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import LendingTable from "@/components/lending/LendingTable";
import LendingForm from "@/components/lending/LendingForm";
import LendingSummary from "@/components/lending/LendingSummary";

interface LendingItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  borrower: string;
  dueDate: string;
  status: "available" | "borrowed" | "overdue";
}

const initialItems: LendingItem[] = [
  {
    id: "1",
    name: "Laptop",
    category: "Electronics",
    quantity: 5,
    borrower: "John Doe",
    dueDate: "2024-08-15",
    status: "borrowed",
  },
  {
    id: "2",
    name: "Projector",
    category: "Electronics",
    quantity: 2,
    borrower: "Jane Smith",
    dueDate: "2024-08-20",
    status: "borrowed",
  },
  {
    id: "3",
    name: "Whiteboard",
    category: "Office Supplies",
    quantity: 10,
    borrower: "",
    dueDate: "",
    status: "available",
  },
  {
    id: "4",
    name: "First Aid Kit",
    category: "Medical Supplies",
    quantity: 3,
    borrower: "",
    dueDate: "",
    status: "available",
  },
];

const LendingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [lendingItems, setLendingItems] = useState<LendingItem[]>(initialItems);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LendingItem | null>(null);

  const handleFilter = (
    query: string,
    category: string,
    status: string
  ) => {
    setSearchQuery(query);
    setCategoryFilter(category);
    setStatusFilter(status);
  };

  const handleReset = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setStatusFilter("all");
  };

  const handleAddItem = (newItem: LendingItem) => {
    setLendingItems([...lendingItems, newItem]);
    setIsAddingItem(false);
    toast.success("Item added successfully!");
  };

  const handleUpdateItem = (updatedItem: LendingItem) => {
    setLendingItems(
      lendingItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    setSelectedItem(null);
    toast.success("Item updated successfully!");
  };

  const handleDeleteItem = (id: string) => {
    setLendingItems(lendingItems.filter((item) => item.id !== id));
    toast.success("Item deleted successfully!");
  };

  const handleItemReturn = (id: string) => {
    setLendingItems(
      lendingItems.map((item) =>
        item.id === id ? { ...item, status: "available", borrower: "", dueDate: "" } : item
      )
    );
    toast.success("Item returned successfully!");
  };

  const filteredItems = lendingItems.filter((item) => {
    const searchMatch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.borrower.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch =
      categoryFilter === "all" || item.category === categoryFilter;
    const statusMatch = statusFilter === "all" || item.status === statusFilter;

    return searchMatch && categoryMatch && statusMatch;
  });

  return (
    <DashboardLayout>
      <Header
        title="Lending Management"
        subtitle="Track and manage lending items"
      />

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Lending Items</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setIsAddingItem(true)}
            >
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </div>
        </div>

        <div className="flex gap-4 items-center mb-4">
          <div className="relative w-72">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Office Supplies">Office Supplies</SelectItem>
              <SelectItem value="Medical Supplies">Medical Supplies</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="borrowed">Borrowed</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {isAddingItem ? (
          <div className="p-6 rounded-xl glass">
            <h3 className="text-lg font-medium mb-4">Add New Lending Item</h3>
            <LendingForm
              onSubmit={handleAddItem}
              onCancel={() => setIsAddingItem(false)}
            />
          </div>
        ) : (
          <LendingTable
            lendingItems={filteredItems}
            onItemReturn={handleItemReturn}
            onDeleteItem={handleDeleteItem}
            onSelectItem={setSelectedItem}
          />
        )}

        {/* Summary Section */}
        <div className="p-6 rounded-xl glass mt-6">
          <h3 className="text-lg font-medium mb-4">Lending Summary</h3>
          <LendingSummary
            lendingItems={filteredItems}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LendingPage;
