
import React, { useState } from "react";
import { Mic, MicOff } from "lucide-react";

interface VoiceButtonProps {
  onActivate?: () => void;
  label?: string;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ 
  onActivate, 
  label = "Voice Assistant" 
}) => {
  const [isActive, setIsActive] = useState(false);
  
  const toggleVoiceAssistant = () => {
    setIsActive(prev => !prev);
    if (onActivate) {
      onActivate();
    }
    
    // Simulate voice assistant speaking
    if (!isActive) {
      console.log("Voice assistant activated");
      setTimeout(() => {
        setIsActive(false);
        console.log("Voice assistant finished");
      }, 3000);
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <button 
        className="btn-voice"
        onClick={toggleVoiceAssistant}
        aria-label={label}
      >
        {isActive && <div className="btn-voice-ring"></div>}
        {isActive ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
      </button>
      <span className="mt-2 text-sm">{label}</span>
    </div>
  );
};

export default VoiceButton;
