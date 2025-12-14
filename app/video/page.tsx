"use client";

import { useRef } from "react";

export default function VideoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const start = async () => {
    await videoRef.current?.play();
    await videoRef.current?.requestFullscreen();
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <video
        src="/images/christmas_background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        Your browser does not support this video tag
      </video>
      <video
        ref={videoRef}
        src="/videos/christmas_video.mp4"
        autoPlay
        loop
        muted={false}
        playsInline
        className="w-200 h-125 object-contain"
      />

      <button
        onClick={start}
        className="absolute inset-0 flex items-center justify-center text-white text-2xl bg-black/60"
      >
        ▶ Tap to Play
      </button>
    </div>
  );
}
