
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Heart, Battery, Smartphone, Video, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Heart, label: "Health", path: "/" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: Battery, label: "Device", path: "/device" },
  { icon: Video, label: "Videos", path: "/videos" },
  { icon: Smartphone, label: "Settings", path: "/settings" }
];

const NavigationFooter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-[#E5E5EA] py-2 px-4 shadow-sm"
         style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
      <div className="flex justify-around items-center">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button 
              key={item.path}
              className={cn(
                "flex flex-col items-center p-2 rounded-lg transition-colors",
                isActive 
                  ? "text-[#007AFF]" 
                  : "text-[#8E8E93] hover:text-[#007AFF]"
              )}
              onClick={() => navigate(item.path)}
              style={{ transition: "all 0.2s ease" }}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span className={`text-xs ${isActive ? "font-medium" : ""}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationFooter;
