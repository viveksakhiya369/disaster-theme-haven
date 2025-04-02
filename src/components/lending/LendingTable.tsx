
import { useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Clock, 
  MoreHorizontal, 
  AlertTriangle, 
  FileX 
} from "lucide-react";
import { LendingItem } from "@/types/lending";

interface LendingTableProps {
  items: LendingItem[];
  onUpdateStatus: (id: string, status: string) => void;
}

const LendingTable = ({ items, onUpdateStatus }: LendingTableProps) => {
  const [sortColumn, setSortColumn] = useState<keyof LendingItem>("lendDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSort = (column: keyof LendingItem) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <Clock className="h-4 w-4 text-primary" />;
      case "Returned":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "Overdue":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "Lost":
        return <FileX className="h-4 w-4 text-warning" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-primary text-primary-foreground";
      case "Returned": return "bg-green-500 text-white";
      case "Overdue": return "bg-destructive text-destructive-foreground";
      case "Lost": return "bg-warning text-warning-foreground";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="pb-2 font-medium">ID</th>
            <th className="pb-2 font-medium">Item</th>
            <th className="pb-2 font-medium">Type</th>
            <th className="pb-2 font-medium">Borrower</th>
            <th className="pb-2 font-medium">Quantity</th>
            <th className="pb-2 font-medium cursor-pointer" onClick={() => handleSort("lendDate")}>
              <div className="flex items-center gap-1">
                Lend Date
                {sortColumn === "lendDate" && (
                  <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </div>
            </th>
            <th className="pb-2 font-medium cursor-pointer" onClick={() => handleSort("expectedReturnDate")}>
              <div className="flex items-center gap-1">
                Return Date
                {sortColumn === "expectedReturnDate" && (
                  <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </div>
            </th>
            <th className="pb-2 font-medium cursor-pointer" onClick={() => handleSort("status")}>
              <div className="flex items-center gap-1">
                Status
                {sortColumn === "status" && (
                  <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </div>
            </th>
            <th className="pb-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr key={item.id} className="border-b hover:bg-accent/10">
              <td className="py-3 text-sm font-mono">{item.id}</td>
              <td className="py-3">
                <div className="font-medium">{item.itemName}</div>
              </td>
              <td className="py-3">{item.itemType}</td>
              <td className="py-3">
                <div>{item.borrower}</div>
                <div className="text-xs text-muted-foreground">{item.borrowerContact}</div>
              </td>
              <td className="py-3">{item.quantity}</td>
              <td className="py-3">{formatDate(item.lendDate)}</td>
              <td className="py-3">{formatDate(item.expectedReturnDate)}</td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.status)}
                  <span className={`text-xs font-medium py-1 px-2 rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </td>
              <td className="py-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onUpdateStatus(item.id, "Active")}>
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Mark Active</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onUpdateStatus(item.id, "Returned")}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      <span>Mark Returned</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onUpdateStatus(item.id, "Overdue")}>
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      <span>Mark Overdue</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onUpdateStatus(item.id, "Lost")}>
                      <FileX className="mr-2 h-4 w-4" />
                      <span>Mark Lost</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LendingTable;
