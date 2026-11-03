"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { mediaUrl } from "@/lib/media";

type DataConnection = {
  saveData?: boolean;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
};

const videoId = "hero-background-video";
const defaultPoster = mediaUrl("/media/videos/ecobiocides-botanical-keyframe.png");

const resolveMediaSource = (path: string) => /^https?:\/\//.test(path) ? path : mediaUrl(path);

export default function HeroVideo({ src, poster }: { src?: string; poster?: string }) {
  const posterSource = poster ? resolveMediaSource(poster) : defaultPoster;
  if (!src) return <Image src={posterSource} alt="" fill priority unoptimized sizes="100vw" className="-z-20 object-cover object-center" />;
  return <PlayableHeroVideo source={resolveMediaSource(src)} poster={posterSource} />;
}

function PlayableHeroVideo({ source, poster }: { source: string; poster: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [policy, setPolicy] = useState({ ready: false, blocked: true });
  const [userOverride, setUserOverride] = useState(false);
  const [pausedByUser, setPausedByUser] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [failed, setFailed] = useState(false);
  const sourceEnabled = policy.ready && (!policy.blocked || userOverride) && !failed;

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: DataConnection }).connection;
    const updatePolicy = () => {
      setPolicy({ ready: true, blocked: motion.matches || connection?.saveData === true });
      setUserOverride(false);
    };
    updatePolicy();
    motion.addEventListener("change", updatePolicy);
    connection?.addEventListener?.("change", updatePolicy);
    return () => {
      motion.removeEventListener("change", updatePolicy);
      connection?.removeEventListener?.("change", updatePolicy);
    };
  }, []);

  useEffect(() => {
    const element = video.current;
    const updateVisibility = () => setPageVisible(document.visibilityState === "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 }) : null;
    if (element) observer?.observe(element);
    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    let cancelled = false;
    if (!sourceEnabled) {
      element.pause();
      element.removeAttribute("src");
      element.load();
    } else if (pausedByUser || !inView || !pageVisible) {
      element.pause();
    } else {
      element.muted = true;
      void element.play().catch(() => {
        if (!cancelled && element.paused) setIsPlaying(false);
      });
    }
    return () => { cancelled = true; };
  }, [source, sourceEnabled, pausedByUser, inView, pageVisible]);

  const togglePlayback = () => {
    const element = video.current;
    if (isPlaying) {
      setPausedByUser(true);
      element?.pause();
      return;
    }
    setUserOverride(true);
    setPausedByUser(false);
    setFailed(false);
    // Keep the direct user gesture when the source is already available.
    if (sourceEnabled && element) {
      element.muted = true;
      void element.play().catch(() => setIsPlaying(false));
    }
  };

  return (
    <>
      <Image src={poster} alt="" fill priority unoptimized sizes="100vw" className="-z-20 object-cover object-center" />
      <video
        ref={video}
        id={videoId}
        src={sourceEnabled ? source : undefined}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => { setIsPlaying(true); setHasFrame(true); }}
        onPause={() => setIsPlaying(false)}
        onEmptied={() => setHasFrame(false)}
        onError={() => { setIsPlaying(false); setFailed(true); }}
        className={`pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-center transition-opacity duration-700 motion-reduce:transition-none ${hasFrame && sourceEnabled ? "opacity-100" : "opacity-0"}`}
      />
      <button type="button" disabled={!policy.ready} onClick={togglePlayback} aria-controls={videoId} aria-label={isPlaying ? "Pause background video" : "Play background video"} className="absolute right-6 top-28 z-10 inline-flex min-h-11 min-w-11 items-center justify-center gap-2.5 rounded-full border border-white/50 bg-[#173f35]/50 px-3 py-2.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-[#173f35]/80 disabled:cursor-wait sm:right-10 sm:px-4 lg:right-16">
        {isPlaying ? <Pause aria-hidden="true" className="h-4 w-4" /> : <Play aria-hidden="true" className="h-4 w-4" />}
        <span className="hidden sm:inline">{isPlaying ? "Pause video" : "Play video"}</span>
      </button>
    </>
  );
}
