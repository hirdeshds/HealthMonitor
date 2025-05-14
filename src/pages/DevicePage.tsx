
import React, { useState } from "react";
import { Battery, Bluetooth, Volume2, MicOff } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import NavigationFooter from "@/components/NavigationFooter";
import { cn } from "@/lib/utils";

const DevicePage: React.FC = () => {
  const [batteryLevel, setBatteryLevel] = useState(75);
  const [isSolarCharging, setIsSolarCharging] = useState(true);
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  
  const handleBluetoothToggle = (checked: boolean) => {
    setIsBluetoothEnabled(checked);
    if (checked) {
      toast.success("Bluetooth enabled");
    } else {
      toast.warning("Bluetooth disabled. Device data will not sync.");
    }
  };
  
  const handleSoundToggle = (checked: boolean) => {
    setIsSoundEnabled(checked);
    toast.success(`Sound ${checked ? 'enabled' : 'disabled'}`);
  };
  
  const handleDeviceCalibration = () => {
    toast.info("Device calibration started...");
    setTimeout(() => {
      toast.success("Device calibrated successfully");
    }, 3000);
  };
  
  const getBatteryColor = () => {
    if (batteryLevel <= 20) return "text-healthBattery-low";
    if (batteryLevel <= 50) return "text-healthBattery-medium";
    return "text-healthBattery-high";
  };
  
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 p-4 border-b">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Device</h1>
          <div className="flex items-center gap-2">
            {isSolarCharging && (
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-healthSuccess mr-1 animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Solar</span>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container px-4 py-6 max-w-md mx-auto">
        <div className="space-y-8">
          {/* Battery Status */}
          <div className="health-card">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium flex items-center">
                <Battery className={cn("mr-2 h-5 w-5", getBatteryColor())} />
                Battery Status
              </h3>
              <span className={cn("font-bold", getBatteryColor())}>{batteryLevel}%</span>
            </div>
            <Progress value={batteryLevel} className="h-2" />
            <p className="mt-2 text-sm text-muted-foreground">
              {isSolarCharging 
                ? "Currently charging via solar power" 
                : "Not charging - connect to USB or place in sunlight"}
            </p>
          </div>
          
          {/* Connectivity Settings */}
          <div className="health-card">
            <h3 className="font-medium mb-4">Connectivity</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bluetooth className="h-5 w-5 text-primary" />
                  <Label htmlFor="bluetooth-toggle">Bluetooth</Label>
                </div>
                <Switch 
                  id="bluetooth-toggle" 
                  checked={isBluetoothEnabled} 
                  onCheckedChange={handleBluetoothToggle} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isSoundEnabled ? (
                    <Volume2 className="h-5 w-5 text-primary" />
                  ) : (
                    <MicOff className="h-5 w-5 text-muted-foreground" />
                  )}
                  <Label htmlFor="sound-toggle">Voice Guidance</Label>
                </div>
                <Switch 
                  id="sound-toggle" 
                  checked={isSoundEnabled} 
                  onCheckedChange={handleSoundToggle} 
                />
              </div>
            </div>
          </div>
          
          {/* Device Management */}
          <div className="health-card">
            <h3 className="font-medium mb-4">Device Management</h3>
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleDeviceCalibration}
              >
                Calibrate Device
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => toast.info("Last synced: Today, 10:45 AM")}
              >
                Sync Data
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => toast.info("Device firmware is up to date")}
              >
                Check for Updates
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer Navigation */}
      <NavigationFooter />
    </div>
  );
};

export default DevicePage;
