
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface TrendDataPoint {
  date: string;
  systolic?: number;
  diastolic?: number;
  bloodSugar?: number;
}

interface HealthTrendChartProps {
  data: TrendDataPoint[];
  type: "bloodPressure" | "bloodSugar";
  period: "week" | "month"; 
}

const HealthTrendChart: React.FC<HealthTrendChartProps> = ({ data, type, period }) => {
  // iOS-like colors
  const chartConfig = {
    systolic: { label: "Systolic", theme: { light: "#007AFF", dark: "#0A84FF" } },
    diastolic: { label: "Diastolic", theme: { light: "#5856D6", dark: "#5E5CE6" } },
    bloodSugar: { label: "Blood Sugar", theme: { light: "#FF9500", dark: "#FF9F0A" } },
  };

  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data} 
          margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EA" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fill: "#8E8E93" }}
            tickFormatter={(value) => value.split(" ")[0]} 
            axisLine={{ stroke: "#E5E5EA" }}
            tickLine={{ stroke: "#E5E5EA" }}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: "#8E8E93" }} 
            domain={type === "bloodPressure" ? ["dataMin - 10", "dataMax + 10"] : ["dataMin - 5", "dataMax + 5"]}
            axisLine={{ stroke: "#E5E5EA" }}
            tickLine={{ stroke: "#E5E5EA" }}
          />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg text-xs">
                    <p className="font-semibold text-center mb-1">{`${label}`}</p>
                    {payload.map((entry, index) => (
                      <p key={`item-${index}`} className="flex justify-between items-center py-1">
                        <span style={{ color: entry.color }}>{`${entry.name}`}</span>
                        <span className="font-medium">{`${entry.value}`}</span>
                      </p>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          {type === "bloodPressure" ? (
            <>
              <Line 
                type="monotone" 
                dataKey="systolic" 
                stroke={chartConfig.systolic.theme.light} 
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 0 }} 
                dot={{ r: 3, strokeWidth: 0, fill: chartConfig.systolic.theme.light }}
              />
              <Line 
                type="monotone" 
                dataKey="diastolic" 
                stroke={chartConfig.diastolic.theme.light} 
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 0 }} 
                dot={{ r: 3, strokeWidth: 0, fill: chartConfig.diastolic.theme.light }}
              />
            </>
          ) : (
            <Line 
              type="monotone" 
              dataKey="bloodSugar" 
              stroke={chartConfig.bloodSugar.theme.light} 
              strokeWidth={2}
              activeDot={{ r: 6, strokeWidth: 0 }} 
              dot={{ r: 3, strokeWidth: 0, fill: chartConfig.bloodSugar.theme.light }}
            />
          )}
          <Legend 
            wrapperStyle={{ paddingTop: 10, fontSize: 12 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthTrendChart;
