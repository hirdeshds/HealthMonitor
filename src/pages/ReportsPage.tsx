
import React, { useState } from "react";
import { toast } from "sonner";
import NavigationFooter from "@/components/NavigationFooter";
import HealthTrendChart from "@/components/HealthTrendChart";
import DoctorConsultationCard from "@/components/DoctorConsultationCard";
import HealthSummaryStats from "@/components/HealthSummaryStats";
import { Button } from "@/components/ui/button";
import { ChevronDown, ShareIcon, DownloadIcon } from "lucide-react";

// Mock data for the report page
const mockBloodPressureData = [
  { date: "May 1", systolic: 118, diastolic: 78 },
  { date: "May 5", systolic: 122, diastolic: 80 },
  { date: "May 10", systolic: 125, diastolic: 82 },
  { date: "May 15", systolic: 130, diastolic: 85 },
  { date: "May 20", systolic: 128, diastolic: 84 },
  { date: "May 25", systolic: 120, diastolic: 79 },
  { date: "May 30", systolic: 115, diastolic: 75 }
];

const mockBloodSugarData = [
  { date: "May 1", bloodSugar: 105 },
  { date: "May 5", bloodSugar: 110 },
  { date: "May 10", bloodSugar: 118 },
  { date: "May 15", bloodSugar: 125 },
  { date: "May 20", bloodSugar: 115 },
  { date: "May 25", bloodSugar: 108 },
  { date: "May 30", bloodSugar: 102 }
];

// Fix the status type to use the specific string union types
const mockHealthStats = [
  { 
    name: "Systolic BP", 
    average: "122", 
    min: "115", 
    max: "130", 
    unit: "mmHg", 
    status: "normal" as const
  },
  { 
    name: "Diastolic BP", 
    average: "80", 
    min: "75", 
    max: "85", 
    unit: "mmHg", 
    status: "normal" as const
  },
  { 
    name: "Blood Sugar", 
    average: "116", 
    min: "102", 
    max: "125", 
    unit: "mg/dL", 
    status: "warning" as const
  }
];

const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"bloodPressure" | "bloodSugar">("bloodPressure");
  const [period, setPeriod] = useState<"week" | "month">("month");
  
  const handleShare = () => {
    toast.success("Report shared successfully!");
  };
  
  const handleDownload = () => {
    toast.info("Report download will be available soon!");
  };

  // Consultation recommendation based on the readings
  const consultationData = {
    reason: "Your blood sugar readings show elevated levels. Consider discussing dietary changes and medication adjustments with your doctor.",
    urgency: "recommended" as const,
    lastReadings: {
      bloodPressure: { systolic: 128, diastolic: 84, date: "May 20" },
      bloodSugar: { value: 125, date: "May 15" }
    }
  };
  
  return (
    <div className="min-h-screen pb-24 bg-[#F2F2F7]" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
      {/* iOS-style Header */}
      <header className="bg-[#F2F2F7] p-4 border-b border-[#E5E5EA] sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-[#000000]">Monthly Report</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleShare}
              className="rounded-full text-[#007AFF] border-[#007AFF] bg-transparent hover:bg-[#007AFF]/10"
            >
              Share
            </Button>
            <Button 
              variant="outline"
              size="sm" 
              onClick={handleDownload}
              className="rounded-full text-[#007AFF] border-[#007AFF] bg-transparent hover:bg-[#007AFF]/10"
            >
              Download
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container px-4 py-6 max-w-md mx-auto">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-[#000000]">Health Trends</h2>
          
          {/* Chart type toggle - iOS segmented control style */}
          <div className="flex mb-4 bg-[#E5E5EA] rounded-xl p-1 shadow-inner">
            <button
              className={`flex-1 py-2 text-sm rounded-xl transition-all ${
                activeTab === "bloodPressure" ? "bg-white text-[#000000] shadow-sm font-medium" : "text-[#8E8E93]"
              }`}
              onClick={() => setActiveTab("bloodPressure")}
            >
              Blood Pressure
            </button>
            <button
              className={`flex-1 py-2 text-sm rounded-xl transition-all ${
                activeTab === "bloodSugar" ? "bg-white text-[#000000] shadow-sm font-medium" : "text-[#8E8E93]"
              }`}
              onClick={() => setActiveTab("bloodSugar")}
            >
              Blood Sugar
            </button>
          </div>
          
          {/* Period toggle - iOS pill style */}
          <div className="flex justify-end mb-2">
            <div className="text-xs bg-[#E5E5EA] rounded-full p-1 inline-flex">
              <button
                className={`px-4 py-1.5 rounded-full transition-all ${
                  period === "week" ? "bg-white text-[#000000] shadow-sm font-medium" : "text-[#8E8E93]"
                }`}
                onClick={() => setPeriod("week")}
              >
                Week
              </button>
              <button
                className={`px-4 py-1.5 rounded-full transition-all ${
                  period === "month" ? "bg-white text-[#000000] shadow-sm font-medium" : "text-[#8E8E93]"
                }`}
                onClick={() => setPeriod("month")}
              >
                Month
              </button>
            </div>
          </div>
          
          {/* Chart - iOS card style */}
          <div className="bg-white rounded-xl p-4 border border-[#E5E5EA] shadow-sm">
            <HealthTrendChart 
              data={activeTab === "bloodPressure" ? mockBloodPressureData : mockBloodSugarData}
              type={activeTab}
              period={period}
            />
          </div>
          
          {/* Summary Stats */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 text-[#000000]">Monthly Summary</h2>
            <HealthSummaryStats stats={mockHealthStats} />
          </div>
          
          {/* Doctor Consultation Card */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 text-[#000000]">Doctor Consultation</h2>
            <DoctorConsultationCard {...consultationData} />
          </div>
        </div>
      </main>
      
      {/* Footer Navigation - iOS style tab bar */}
      <NavigationFooter />
    </div>
  );
};

export default ReportsPage;
