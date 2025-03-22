
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const statusVariants = cva(
  "p-6 rounded-xl glass transition-all duration-300 ease-in-out animate-in",
  {
    variants: {
      variant: {
        default: "border-primary/20",
        success: "border-success/20",
        warning: "border-warning/20",
        danger: "border-destructive/20",
        info: "border-info/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatusCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  trend?: {
    value: number;
    isUpward: boolean;
  };
  footer?: React.ReactNode;
}

const StatusCard = ({
  title,
  value,
  icon,
  variant = "default",
  trend,
  footer,
  className,
  ...props
}: StatusCardProps) => {
  const variantToColor = {
    default: "text-primary",
    success: "text-success",
    warning: "text-warning",
    danger: "text-destructive",
    info: "text-info",
  };

  const iconColor = variantToColor[variant];

  return (
    <div className={cn(statusVariants({ variant }), className)} {...props}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-1">
              <span 
                className={cn(
                  "text-xs font-medium",
                  trend.isUpward ? "text-success" : "text-destructive"
                )}
              >
                {trend.isUpward ? "+" : "-"}{Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs last week</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className={cn("p-2 rounded-lg", iconColor)}>
            {icon}
          </div>
        )}
      </div>
      
      {footer && (
        <div className="pt-4 border-t border-border/80">
          {footer}
        </div>
      )}
    </div>
  );
};

export default StatusCard;
