"use client";

import { useRef, useState } from "react";

export default function VideoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const start = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setPlaying(true);

      if (video.requestFullscreen) {
        await video.requestFullscreen();
      }
    } catch (err) {
      console.error("Video playback failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        src="/images/christmas_background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Main memory video */}
      <video
        ref={videoRef}
        src="/images/memory/memory.mp4"
        playsInline
        className="relative z-10 w-[800px] max-w-full object-contain"
        controls={playing} // show controls after user starts
      />

      {/* Tap to play overlay */}
      {!playing && (
        <button
          onClick={start}
          className="absolute inset-0 z-20 flex items-center justify-center text-white text-2xl bg-black/60 hover:bg-black/40 transition"
        >
          ▶ Tap to Play
        </button>
      )}
    </div>
  );
}
