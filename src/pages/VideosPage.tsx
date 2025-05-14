
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import NavigationFooter from "@/components/NavigationFooter";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
}

const videoTutorials: VideoItem[] = [
  {
    id: "setup",
    title: "Device Setup Guide",
    description: "Learn how to set up your device for the first time",
    thumbnailUrl: "https://placehold.co/600x400/2D87BB/FFFFFF?text=Setup+Guide",
    videoUrl: "https://example.com/videos/setup.mp4"
  },
  {
    id: "bloodpressure",
    title: "Blood Pressure Measurement",
    description: "How to take accurate blood pressure readings",
    thumbnailUrl: "https://placehold.co/600x400/2D87BB/FFFFFF?text=Blood+Pressure+Guide",
    videoUrl: "https://example.com/videos/blood-pressure.mp4"
  },
  {
    id: "bloodsugar",
    title: "Blood Sugar Testing",
    description: "Step-by-step guide for testing blood sugar levels",
    thumbnailUrl: "https://placehold.co/600x400/2D87BB/FFFFFF?text=Blood+Sugar+Guide",
    videoUrl: "https://example.com/videos/blood-sugar.mp4"
  },
  {
    id: "app",
    title: "Using the Mobile App",
    description: "Overview of the mobile app features and settings",
    thumbnailUrl: "https://placehold.co/600x400/2D87BB/FFFFFF?text=App+Guide",
    videoUrl: "https://example.com/videos/app-guide.mp4"
  }
];

const VideosPage: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = React.useState<VideoItem | null>(null);
  
  const handleVideoSelect = (video: VideoItem) => {
    setSelectedVideo(video);
    // In a real app, we would load the actual video here
    console.log(`Video selected: ${video.title}`);
  };
  
  return (
    <div className="container mx-auto pb-20 pt-4">
      <h1 className="text-2xl font-bold mb-6">Help Videos</h1>
      
      {selectedVideo ? (
        <div className="mb-6">
          <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
            {/* In a real app, this would be a video player */}
            <div className="text-white text-center p-4">
              <p className="text-xl mb-2">{selectedVideo.title}</p>
              <p className="text-sm mb-4">{selectedVideo.description}</p>
              <p className="text-gray-400">(Video player would appear here)</p>
            </div>
          </div>
          <button 
            onClick={() => setSelectedVideo(null)}
            className="mb-6 text-primary font-medium flex items-center"
          >
            ← Back to all videos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videoTutorials.map((video) => (
            <Card 
              key={video.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleVideoSelect(video)}
            >
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg">{video.title}</CardTitle>
                <CardDescription>{video.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="aspect-video bg-gray-100 rounded overflow-hidden">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <NavigationFooter />
    </div>
  );
};

export default VideosPage;
