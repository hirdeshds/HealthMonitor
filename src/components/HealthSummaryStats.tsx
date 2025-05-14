
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface HealthStat {
  name: string;
  average: string;
  min: string;
  max: string;
  unit: string;
  status: "normal" | "warning" | "danger";
}

interface HealthSummaryStatsProps {
  stats: HealthStat[];
}

const HealthSummaryStats: React.FC<HealthSummaryStatsProps> = ({ stats }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case "normal": return "text-emerald-600 dark:text-emerald-400";
      case "warning": return "text-amber-600 dark:text-amber-400";
      case "danger": return "text-red-600 dark:text-red-400";
      default: return "";
    }
  };
  
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Measurement</TableHead>
            <TableHead>Average</TableHead>
            <TableHead>Range</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stats.map((stat) => (
            <TableRow key={stat.name}>
              <TableCell className="font-medium">{stat.name}</TableCell>
              <TableCell>{stat.average} {stat.unit}</TableCell>
              <TableCell>{stat.min} - {stat.max} {stat.unit}</TableCell>
              <TableCell className={getStatusColor(stat.status)}>
                {stat.status.charAt(0).toUpperCase() + stat.status.slice(1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HealthSummaryStats;
