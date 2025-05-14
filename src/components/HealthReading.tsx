
import React from "react";
import { cn } from "@/lib/utils";

interface HealthReadingProps {
  value: number | string;
  unit: string;
  label: string;
  status?: "normal" | "warning" | "danger";
  className?: string;
  lastMeasured?: string;
}

const HealthReading: React.FC<HealthReadingProps> = ({
  value,
  unit,
  label,
  status = "normal",
  className,
  lastMeasured,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "normal":
        return "border-healthSuccess bg-healthSuccess/5";
      case "warning":
        return "border-healthWarning bg-healthWarning/5";
      case "danger":
        return "border-healthDanger bg-healthDanger/5";
      default:
        return "border-healthSuccess bg-healthSuccess/5";
    }
  };
  
  const getTextColor = () => {
    switch (status) {
      case "normal":
        return "text-healthSuccess";
      case "warning":
        return "text-healthWarning";
      case "danger":
        return "text-healthDanger";
      default:
        return "text-healthSuccess";
    }
  };
  
  return (
    <div className={cn("health-card", getStatusColor(), className)}>
      <h3 className="reading-label">{label}</h3>
      <div className="flex items-baseline">
        <span className={cn("reading-value", getTextColor())}>{value}</span>
        <span className="reading-unit">{unit}</span>
      </div>
      {lastMeasured && (
        <p className="text-xs text-muted-foreground mt-2">Last measured: {lastMeasured}</p>
      )}
    </div>
  );
};

export default HealthReading;
