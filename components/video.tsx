"use client";
import React, { useEffect, useRef, useState } from "react";

const tracks = [
  { src: "/images/audio/christmas_1.mp3", title: "christmas 1" },
  { src: "/images/audio/christmas_2.mp3", title: "christmas 2" },
  { src: "/images/audio/christmas_3.mp3", title: "christmas 3" },
  { src: "/images/audio/christmas_4.mp3", title: "christmas 4" },
];

const FADE_TIME = 2000;

export default function VideoPage() {
  const [index, setIndex] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [volume, setVolume] = useState(0.6);

  const aRef = useRef<HTMLAudioElement | null>(null);
  const bRef = useRef<HTMLAudioElement | null>(null);
  const activeRef = useRef<"a" | "b">("a");

  useEffect(() => {
    const saved = localStorage.getItem("bg-audio");
    if (!saved) return;
    const s = JSON.parse(saved);
    setIndex(s.index ?? 0);
    setEnabled(s.enabled ?? false);
    setVolume(s.volume ?? 0.6);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "bg-audio",
      JSON.stringify({ index, enabled, volume })
    );
  }, [index, enabled, volume]);

  const fade = (
    from: HTMLAudioElement,
    to: HTMLAudioElement,
    done: () => void
  ) => {
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - start) / FADE_TIME, 1);
      from.volume = volume * (1 - p);
      to.volume = volume * p;
      if (p < 1) requestAnimationFrame(step);
      else {
        from.pause();
        done();
      }
    };
    requestAnimationFrame(step);
  };

  const playNext = (nextIndex: number) => {
    const current = activeRef.current === "a" ? aRef.current : bRef.current;
    const next = activeRef.current === "a" ? bRef.current : aRef.current;
    if (!current || !next) return;

    next.src = tracks[nextIndex].src;
    next.volume = 0;
    next.currentTime = 0;

    next.oncanplaythrough = async () => {
      await next.play();
      fade(current, next, () => {
        activeRef.current = activeRef.current === "a" ? "b" : "a";
        setIndex(nextIndex);
      });
    };

    next.load();
  };

  const handleEnable = async () => {
    const audio = aRef.current;
    if (!audio) return;

    audio.src = tracks[index].src;
    audio.volume = volume;
    audio.muted = false;
    await audio.play();
    setEnabled(true);
    setPaused(false);

    audio.onended = () => playNext((index + 1) % tracks.length);
  };

  const togglePause = () => {
    const current = activeRef.current === "a" ? aRef.current : bRef.current;
    if (!current) return;

    if (paused) {
      current.play();
      setPaused(false);
    } else {
      current.pause();
      setPaused(true);
    }
  };

  const handleVolume = (v: number) => {
    setVolume(v);
    if (aRef.current) aRef.current.volume = v;
    if (bRef.current) bRef.current.volume = v;
  };

  return (
    <>
      <audio ref={aRef} />
      <audio ref={bRef} />

      {!enabled && (
        <button
          onClick={handleEnable}
          className="fixed bottom-4 right-4 z-50 bg-orange-500 text-white px-3 py-1 rounded-md"
        >
          Enable audio
        </button>
      )}

      {enabled && (
        <div className="fixed bottom-4 right-4 z-50 bg-black/70 text-white p-3 rounded-md w-56 space-y-2">
          <div className="text-sm truncate">{tracks[index].title}</div>

          <button
            onClick={togglePause}
            className="w-full bg-white/10 rounded py-1 text-sm"
          >
            {paused ? "Play" : "Pause"}
          </button>

          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => handleVolume(Number(e.target.value))}
            className="w-full"
          />
        </div>
      )}
    </>
  );
}
