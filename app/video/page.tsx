"use client";

import { useRef } from "react";

export default function VideoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const start = async () => {
    const video = videoRef.current;
    if (!video) return;

    await video.play();
    if (video.requestFullscreen) {
      await video.requestFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      <video
        src="/images/christmas_background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <video
        ref={videoRef}
        src="/images/memory/memory.mp4"
        playsInline
        className="relative z-10 w-[800px] max-w-full object-contain"
      />

      <button
        onClick={start}
        className="absolute inset-0 z-20 flex items-center justify-center text-white text-2xl bg-black/60 hover:bg-black/40 transition"
      >
        ▶ Tap to Play
      </button>
    </div>
  );
}
