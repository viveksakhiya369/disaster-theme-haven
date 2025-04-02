
export interface LendingItem {
  id: string;
  itemName: string;
  itemType: string;
  borrower: string;
  borrowerContact: string;
  quantity: number;
  lendDate: string;
  expectedReturnDate: string;
  actualReturnDate?: string;
  notes?: string;
  status: 'Active' | 'Returned' | 'Overdue' | 'Lost';
}

export type LendingStatus = 'Active' | 'Returned' | 'Overdue' | 'Lost';
