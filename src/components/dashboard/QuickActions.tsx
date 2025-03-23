
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlarmClock, AlarmPlus, Bell, BellPlus, FileText, Link, MessageSquare, Phone, Plus, Share2, Siren } from "lucide-react";

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "destructive" | "warning";
}

const QuickActionButton = ({ icon, label, onClick, variant = "primary" }: QuickActionButtonProps) => {
  const variantToClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    warning: "bg-warning text-warning-foreground hover:bg-warning/90",
  };

  return (
    <Button
      className={cn(
        "flex flex-col items-center gap-1 h-auto py-3 px-4 transition-all duration-200 ease-in-out",
        variantToClasses[variant]
      )}
      onClick={onClick}
    >
      <div className="text-lg">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </Button>
  );
};

const QuickActions = () => {
  return (
    <div className="p-6 rounded-xl glass transition-all duration-300 ease-in-out animate-in">
      <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <QuickActionButton
          icon={<Siren />}
          label="New Alert"
          variant="destructive"
        />
        <QuickActionButton
          icon={<BellPlus />}
          label="Notification"
          variant="warning"
        />
        <QuickActionButton
          icon={<FileText />}
          label="Report"
        />
        <QuickActionButton
          icon={<Phone />}
          label="Call"
        />
        <QuickActionButton
          icon={<MessageSquare />}
          label="Message"
        />
      </div>
    </div>
  );
};

export default QuickActions;
