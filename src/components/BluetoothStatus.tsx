
import React, { useState, useEffect } from "react";
import { Battery, BluetoothOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface BluetoothStatusProps {
  className?: string;
}

const BluetoothStatus: React.FC<BluetoothStatusProps> = ({ className }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState<number>(75);
  
  // Simulate changing connection status
  useEffect(() => {
    const timer = setInterval(() => {
      setIsConnected(prev => !prev);
    }, 10000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Simulate changing battery level
  useEffect(() => {
    if (isConnected) {
      const timer = setInterval(() => {
        setBatteryLevel(prev => Math.max(10, Math.min(100, prev + Math.floor(Math.random() * 11) - 5)));
      }, 30000);
      
      return () => clearInterval(timer);
    }
  }, [isConnected]);
  
  // Determine battery color based on level
  const getBatteryColor = () => {
    if (batteryLevel <= 20) return "text-healthBattery-low";
    if (batteryLevel <= 50) return "text-healthBattery-medium";
    return "text-healthBattery-high";
  };
  
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {isConnected ? (
        <>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-healthSuccess animate-pulse mr-1"></div>
            <span className="text-sm text-muted-foreground">Connected</span>
          </div>
          <Battery className={cn("h-5 w-5", getBatteryColor())} />
          <span className="text-sm">{batteryLevel}%</span>
        </>
      ) : (
        <>
          <BluetoothOff className="h-5 w-5 text-healthDanger" />
          <span className="text-sm text-muted-foreground">Not connected</span>
        </>
      )}
    </div>
  );
};

export default BluetoothStatus;
