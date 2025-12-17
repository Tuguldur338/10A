"use client";
import React, { useEffect, useRef, useState } from "react";

// List of audio tracks with their file paths and display titles
const tracks = [
  { src: "/images/audio/christmas_1.mp3", title: "christmas 1" },
  { src: "/images/audio/christmas_2.mp3", title: "christmas 2" },
  { src: "/images/audio/christmas_3.mp3", title: "christmas 3" },
  { src: "/images/audio/christmas_4.mp3", title: "christmas 4" },
  { src: "/images/audio/christmas_5.mp3", title: "christmas 5" },
  { src: "/images/audio/christmas_6.mp3", title: "christmas 6" },
  { src: "/images/audio/christmas_7.mp3", title: "christmas 7" },
];

// Fade duration between tracks in milliseconds
const FADE_TIME = 2000;

export default function VideoPage() {
  // Current track index
  const [index, setIndex] = useState(0);
  // Whether the audio system has been enabled by the user
  const [enabled, setEnabled] = useState(false);
  // Whether the currently playing audio is paused
  const [paused, setPaused] = useState(false);
  // Global volume (0.0 - 1.0)
  const [volume, setVolume] = useState(0.6);

  // References to two audio elements for crossfade
  const aRef = useRef<HTMLAudioElement | null>(null);
  const bRef = useRef<HTMLAudioElement | null>(null);
  // Keeps track of which audio element is currently active
  const activeRef = useRef<"a" | "b">("a");
  // Prevent multiple crossfade transitions at the same time
  const transitioningRef = useRef(false);

  // Restore audio state from localStorage on page load
  useEffect(() => {
    const saved = localStorage.getItem("bg-audio");
    if (!saved) return;
    const s = JSON.parse(saved);
    setIndex(s.index ?? 0);
    setEnabled(s.enabled ?? false);
    setVolume(s.volume ?? 0.6);

    // If audio was previously enabled, initialize audio element
    if (s.enabled) {
      const audio = aRef.current;
      if (audio) {
        audio.src = tracks[s.index ?? 0].src;
        audio.volume = s.volume ?? 0.6;
        audio.muted = false;
        // Set up next track to play automatically when current ends
        audio.onended = () => playNext(((s.index ?? 0) + 1) % tracks.length);
      }
    }
  }, []);

  // Persist audio state whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "bg-audio",
      JSON.stringify({ index, enabled, volume })
    );
  }, [index, enabled, volume]);

  // Crossfade function: gradually fades out 'from' audio and fades in 'to' audio
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
        setTimeout(() => from.pause(), 50); // pause after fade to avoid AbortError
        done();
      }
    };
    requestAnimationFrame(step);
  };

  // Play the next track with crossfade
  const playNext = (nextIndex: number) => {
    if (transitioningRef.current) return; // prevent overlapping transitions
    transitioningRef.current = true;

    const current = activeRef.current === "a" ? aRef.current : bRef.current;
    const next = activeRef.current === "a" ? bRef.current : aRef.current;
    if (!current || !next) {
      transitioningRef.current = false;
      return;
    }

    next.src = tracks[nextIndex].src; // set next track
    next.currentTime = 0;
    next.volume = 0;

    const startNext = async () => {
      try {
        await next.play().catch((e) => {
          if (e.name !== "AbortError") console.error(e);
        });

        const start = performance.now();
        const step = (t: number) => {
          const p = Math.min((t - start) / FADE_TIME, 1);
          current.volume = volume * (1 - p);
          next.volume = volume * p;

          if (p < 1) requestAnimationFrame(step);
          else {
            setTimeout(() => current.pause(), 50);
            // Swap active element
            activeRef.current = activeRef.current === "a" ? "b" : "a";
            setIndex(nextIndex);
            transitioningRef.current = false;
          }
        };
        requestAnimationFrame(step);
      } catch {
        setTimeout(startNext, 200); // retry if play fails
      }
    };

    next.oncanplaythrough = startNext; // wait until next track is ready
    next.load();
  };

  // Enable the audio system and start playing the current track
  const handleEnable = async () => {
    const audio = aRef.current;
    if (!audio) return;

    audio.src = tracks[index].src;
    audio.volume = volume;
    audio.muted = false;
    await audio.play().catch((e) => {
      if (e.name !== "AbortError") console.error(e);
    });

    setEnabled(true);
    setPaused(false);

    // Automatically play the next track when current ends
    audio.onended = () => playNext((index + 1) % tracks.length);
  };

  // Toggle play/pause for the current track
  const togglePause = () => {
    const current = activeRef.current === "a" ? aRef.current : bRef.current;
    if (!current || transitioningRef.current) return;

    if (paused) {
      current.play().catch((e) => {
        if (e.name !== "AbortError") console.error(e);
      });
      setPaused(false);
    } else {
      current.pause();
      setPaused(true);
    }
  };

  // Update volume of both audio elements
  const handleVolume = (v: number) => {
    setVolume(v);
    if (aRef.current) aRef.current.volume = v;
    if (bRef.current) bRef.current.volume = v;
  };

  return (
    <>
      {/* Two hidden audio elements used for crossfading tracks */}
      <audio ref={aRef} />
      <audio ref={bRef} />

      {/* Button to enable audio if it hasn't been started yet */}
      {!enabled && (
        <button
          onClick={handleEnable}
          className="fixed bottom-4 right-4 z-50 bg-orange-500 text-white px-3 py-1 rounded-md! hover:scale-105! transition-all duration-300"
        >
          Enable audio
        </button>
      )}

      {/* Controls shown after audio has been enabled */}
      {enabled && (
        <div className="fixed bottom-4 right-4 z-50 bg-black/70 text-white p-3 rounded-md w-56 space-y-2">
          {/* Display current track title */}
          <div className="text-sm truncate">{tracks[index].title}</div>

          {/* Play/Pause toggle button */}
          <button
            onClick={togglePause}
            className="w-full bg-white/10 rounded py-1 text-sm"
          >
            {paused ? "Play" : "Pause"}
          </button>

          {/* Volume slider */}
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
