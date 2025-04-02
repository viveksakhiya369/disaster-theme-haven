
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface LendingSummaryProps {
  totalItems: number;
  activeLoans: number;
  overdueLoans: number;
}

const LendingSummary = ({ totalItems, activeLoans, overdueLoans }: LendingSummaryProps) => {
  const returnedLoans = totalItems - activeLoans - overdueLoans;

  return (
    <>
      <Card className="border border-border/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Active Loans</CardTitle>
          <CardDescription>Currently out on loan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-primary" />
              <div className="text-3xl font-bold">{activeLoans}</div>
            </div>
            <div className="text-sm text-muted-foreground">
              {((activeLoans / totalItems) * 100).toFixed(0)}% of total
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Returned Items</CardTitle>
          <CardDescription>Successfully returned</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="text-3xl font-bold">{returnedLoans}</div>
            </div>
            <div className="text-sm text-muted-foreground">
              {((returnedLoans / totalItems) * 100).toFixed(0)}% of total
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Overdue Items</CardTitle>
          <CardDescription>Past expected return date</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div className="text-3xl font-bold">{overdueLoans}</div>
            </div>
            <div className="text-sm text-muted-foreground">
              {((overdueLoans / totalItems) * 100).toFixed(0)}% of total
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LendingSummary;
