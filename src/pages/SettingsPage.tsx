
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LanguageSelector from "@/components/LanguageSelector";
import { toast } from "sonner";
import NavigationFooter from "@/components/NavigationFooter";

const SettingsPage: React.FC = () => {
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully");
  };
  
  const handleClearData = () => {
    toast.info("This will delete all your health data", {
      action: {
        label: "Confirm",
        onClick: () => toast.error("All data has been cleared"),
      },
    });
  };
  
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 p-4 border-b">
        <h1 className="text-xl font-bold text-primary">Settings</h1>
      </header>
      
      {/* Main Content */}
      <main className="container px-4 py-6 max-w-md mx-auto">
        <form onSubmit={handleSaveSettings} className="space-y-6">
          {/* User Profile */}
          <div className="health-card">
            <h3 className="font-medium mb-4">User Profile</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="Enter your age" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergency-contact">Emergency Contact</Label>
                <Input id="emergency-contact" placeholder="Phone number" />
              </div>
            </div>
          </div>
          
          {/* Language Settings */}
          <div className="health-card">
            <h3 className="font-medium mb-4">Language Settings</h3>
            <LanguageSelector />
            <p className="text-sm text-muted-foreground mt-2">
              Voice instructions will be provided in the selected language
            </p>
          </div>
          
          {/* Health Goals */}
          <div className="health-card">
            <h3 className="font-medium mb-4">Health Targets</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bp-target">Blood Pressure Target (mmHg)</Label>
                <Input id="bp-target" placeholder="e.g. 120/80" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bs-target">Blood Sugar Target (mg/dL)</Label>
                <Input id="bs-target" placeholder="e.g. 100" />
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button type="submit" className="w-full">Save Settings</Button>
            <Button 
              type="button" 
              variant="destructive"
              onClick={handleClearData}
              className="w-full"
            >
              Clear Health Data
            </Button>
          </div>
        </form>
      </main>
      
      {/* Footer Navigation */}
      <NavigationFooter />
    </div>
  );
};

export default SettingsPage;
