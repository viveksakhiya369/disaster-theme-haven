
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { LendingItem } from "@/types/lending";

interface LendingFormProps {
  onSubmit: (item: LendingItem) => void;
  onCancel: () => void;
}

const LendingForm = ({ onSubmit, onCancel }: LendingFormProps) => {
  const [formData, setFormData] = useState<Omit<LendingItem, 'id'>>({
    itemName: "",
    itemType: "Equipment",
    borrower: "",
    borrowerContact: "",
    quantity: 1,
    lendDate: new Date().toISOString().slice(0, 16),
    expectedReturnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    notes: "",
    status: "Active"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as LendingItem);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="itemName">Item Name *</Label>
          <Input 
            id="itemName" 
            name="itemName" 
            value={formData.itemName} 
            onChange={handleChange} 
            placeholder="Enter item name" 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="itemType">Item Type *</Label>
          <Select 
            value={formData.itemType} 
            onValueChange={(value) => handleSelectChange("itemType", value)}
          >
            <SelectTrigger id="itemType">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Equipment">Equipment</SelectItem>
              <SelectItem value="Supplies">Supplies</SelectItem>
              <SelectItem value="Shelter">Shelter</SelectItem>
              <SelectItem value="Vehicle">Vehicle</SelectItem>
              <SelectItem value="Medical">Medical</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="borrower">Borrower Name/Organization *</Label>
          <Input 
            id="borrower" 
            name="borrower" 
            value={formData.borrower} 
            onChange={handleChange} 
            placeholder="Enter borrower name" 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="borrowerContact">Contact Information *</Label>
          <Input 
            id="borrowerContact" 
            name="borrowerContact" 
            value={formData.borrowerContact} 
            onChange={handleChange} 
            placeholder="Phone number or email" 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity *</Label>
          <Input 
            id="quantity" 
            name="quantity" 
            type="number" 
            min="1" 
            value={formData.quantity} 
            onChange={handleNumberChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select 
            value={formData.status} 
            onValueChange={(value) => handleSelectChange("status", value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lendDate">Lend Date & Time *</Label>
          <Input 
            id="lendDate" 
            name="lendDate" 
            type="datetime-local" 
            value={formData.lendDate} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="expectedReturnDate">Expected Return Date & Time *</Label>
          <Input 
            id="expectedReturnDate" 
            name="expectedReturnDate" 
            type="datetime-local" 
            value={formData.expectedReturnDate} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea 
            id="notes" 
            name="notes" 
            value={formData.notes} 
            onChange={handleChange} 
            placeholder="Add any additional information..." 
            className="min-h-[80px]" 
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Add Item
        </Button>
      </div>
    </form>
  );
};

export default LendingForm;
