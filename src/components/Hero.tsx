import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-screen mb-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      >
        <source src="/hero/sports-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Text in the middle with transparency */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white text-6xl font-black text-center bg-black bg-opacity-40 px-8 py-6 rounded-lg backdrop-blur-sm">
          Sports Connect is the way
        </p>
      </div>
    </div>
  );
};
