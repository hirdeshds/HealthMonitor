
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MessageSquare, User } from "lucide-react";
import { toast } from "sonner";

interface DoctorConsultationCardProps {
  reason: string;
  urgency: "routine" | "recommended" | "urgent";
  lastReadings: {
    bloodPressure?: { systolic: number; diastolic: number; date: string };
    bloodSugar?: { value: number; date: string };
  };
}

const DoctorConsultationCard: React.FC<DoctorConsultationCardProps> = ({ 
  reason, 
  urgency,
  lastReadings 
}) => {
  const handleScheduleConsultation = () => {
    // In a real app, this would open a scheduling interface
    toast.success("Consultation scheduling will be available soon!");
  };
  
  const handleCallDoctor = () => {
    // In a real app, this would initiate a call
    toast.info("Doctor call functionality will be available soon!");
  };
  
  const getUrgencyColor = () => {
    switch(urgency) {
      case "urgent": return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300";
      case "recommended": return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
      case "routine": return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
      default: return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300";
    }
  };
  
  const getUrgencyText = () => {
    switch(urgency) {
      case "urgent": return "Urgent Consultation";
      case "recommended": return "Recommended Consultation";
      case "routine": return "Routine Checkup";
      default: return "Consultation";
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">Doctor Consultation</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${getUrgencyColor()}`}>
            {getUrgencyText()}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="mb-4 text-sm text-muted-foreground">{reason}</p>
        
        {/* Last readings summary */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-md p-3 text-sm space-y-2">
          <h4 className="font-medium text-sm">Recent Readings:</h4>
          
          {lastReadings.bloodPressure && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Blood Pressure:</span>
              <span className="font-medium">{lastReadings.bloodPressure.systolic}/{lastReadings.bloodPressure.diastolic} mmHg</span>
            </div>
          )}
          
          {lastReadings.bloodSugar && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Blood Sugar:</span>
              <span className="font-medium">{lastReadings.bloodSugar.value} mg/dL</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1" 
          onClick={handleScheduleConsultation}
        >
          <CalendarDays className="w-4 h-4 mr-2" />
          Schedule
        </Button>
        <Button 
          className="flex-1"
          onClick={handleCallDoctor}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Contact Doctor
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorConsultationCard;
