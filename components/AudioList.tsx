"use client";
import React from "react";

const tracks = [
  { src: "/audio/christmas_1.mp3", title: "christmas 1" },
  { src: "/audio/christmas_2.mp3", title: "christmas 2" },
  { src: "/audio/christmas_3.mp3", title: "christmas 3" },
  { src: "/audio/christmas_4.mp3", title: "christmas 4" },
];

export default function AudioList() {
  return (
    <div className="w-0 h-0 absolute overflow-hidden flex flex-col gap-4 p-4 bottom-4 left-1/2 transform -translate-x-1/2">
      {tracks.map((t) => (
        <div key={t.src} className="bg-black/50 rounded px-3 py-2">
          <div className="flex items-center justify-between gap-4">
            <div className="text-white text-sm font-lora">{t.title}</div>
            <audio controls muted={false} className="w-48" src={t.src} />
          </div>
        </div>
      ))}
    </div>
  );
}
