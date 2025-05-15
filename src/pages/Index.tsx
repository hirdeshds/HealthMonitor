
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import BluetoothStatus from "@/components/BluetoothStatus";
import HealthReading from "@/components/HealthReading";
import VoiceButton from "@/components/VoiceButton";
import LanguageSelector from "@/components/LanguageSelector";
import NavigationFooter from "@/components/NavigationFooter";

interface HealthData {
  bloodPressure: {
    systolic: number;
    diastolic: number;
    status: "normal" | "warning" | "danger";
    lastMeasured: string;
  };
  bloodSugar: {
    value: number;
    status: "normal" | "warning" | "danger";
    lastMeasured: string;
  };
}

// Mock data (in a real app this would come from the device)
const mockHealthData: HealthData = {
  bloodPressure: {
    systolic: 118,
    diastolic: 78,
    status: "normal",
    lastMeasured: "Today, 9:30 AM",
  },
  bloodSugar: {
    value: 105,
    status: "normal",
    lastMeasured: "Today, 9:35 AM",
  },
};

const HomePage: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthData>(mockHealthData);
  const [isOffline, setIsOffline] = useState(false);
  
  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      toast.success("You are back online");
    };
    
    const handleOffline = () => {
      setIsOffline(true);
      toast.warning("You are offline. Your data will be saved locally.");
    };
    
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    
    // Check initial status
    setIsOffline(!navigator.onLine);
    
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  
  // Simulate new readings every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random readings (for demo purposes)
      const newSystolic = Math.floor(Math.random() * 40) + 100; // 100-140
      const newDiastolic = Math.floor(Math.random() * 30) + 60; // 60-90
      const newBloodSugar = Math.floor(Math.random() * 50) + 80; // 80-130
      
      // Determine status based on values
      const bpStatus = newSystolic > 130 || newDiastolic > 85 
        ? newSystolic > 140 || newDiastolic > 90 ? "danger" : "warning" 
        : "normal";
      
      const bsStatus = newBloodSugar > 120 
        ? newBloodSugar > 140 ? "danger" : "warning" 
        : "normal";
      
      const now = new Date();
      const timeString = `Today, ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
      
      setHealthData({
        bloodPressure: {
          systolic: newSystolic,
          diastolic: newDiastolic,
          status: bpStatus,
          lastMeasured: timeString,
        },
        bloodSugar: {
          value: newBloodSugar,
          status: bsStatus,
          lastMeasured: timeString,
        },
      });
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle language change
  const handleLanguageChange = (languageCode: string) => {
    toast.success(`Language changed to ${languageCode}`);
    console.log("Language changed to", languageCode);
    // In a real app, we would update the UI language
  };
  
  // Handle voice assistant activation
  const handleVoiceActivation = () => {
    const messages = [
      "Your blood pressure is normal at 118 over 78.",
      "Your blood sugar level is normal at 105 mg/dL.",
      "Please keep taking your medication regularly.",
    ];
    
    // Simulate voice response
    messages.forEach((message, index) => {
      setTimeout(() => {
        toast.info(message);
      }, index * 2000);
    });
  };
  
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 p-4 border-b">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">SwasthyaMate</h1>
          <BluetoothStatus />
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container px-4 py-6 max-w-md mx-auto">
        {/* Offline Indicator */}
        {isOffline && (
          <div className="bg-healthWarning/10 border border-healthWarning rounded-lg p-3 mb-6 flex items-center">
            <div className="h-3 w-3 rounded-full bg-healthWarning mr-2"></div>
            <p className="text-sm">You are offline. Data will sync when connection is restored.</p>
          </div>
        )}
        
        {/* Language Selector */}
        <div className="mb-6">
          <LanguageSelector onLanguageChange={handleLanguageChange} />
        </div>
        
        {/* Health Readings */}
        <div className="space-y-6">
          <HealthReading
            label="Blood Pressure"
            value={`${healthData.bloodPressure.systolic}/${healthData.bloodPressure.diastolic}`}
            unit="mmHg"
            status={healthData.bloodPressure.status}
            lastMeasured={healthData.bloodPressure.lastMeasured}
          />
          
          <HealthReading
            label="Blood Sugar"
            value={healthData.bloodSugar.value}
            unit="mg/dL"
            status={healthData.bloodSugar.status}
            lastMeasured={healthData.bloodSugar.lastMeasured}
          />
          
          {/* Voice Assistant Button */}
          <div className="mt-12 flex justify-center">
            <VoiceButton 
              label="Tap for Voice Guidance" 
              onActivate={handleVoiceActivation}
            />
          </div>
        </div>
      </main>
      
      {/* Footer Navigation */}
      <NavigationFooter />
    </div>
  );
};

export default HomePage;
