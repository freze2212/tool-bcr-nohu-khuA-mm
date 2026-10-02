import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { getAssetUrl } from "../utils/assetUrl";
import "./ToolVideoBackground.css";

export default function ToolVideoBackground() {
  const { pathname } = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const poster = getAssetUrl("/assets/khua/matrix-yellow.png");
  const src = getAssetUrl("/assets/khua/matrix-yellow.mp4");

  useEffect(() => {
    const frame = getAssetUrl("/assets/khua/popup-warn-frame.png");
    document.documentElement.style.setProperty(
      "--khua-popup-frame",
      `url("${frame}")`
    );
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || pathname.startsWith("/admin")) return;
    video.muted = true;
    const play = video.play();
    if (play) play.catch(() => undefined);
  }, [pathname, src]);

  if (pathname.startsWith("/admin")) return null;

  return createPortal(
    <div
      className="tool-video-bg"
      style={{ backgroundImage: `url(${poster})` }}
      aria-hidden
    >
      <video
        ref={videoRef}
        className={`tool-video-bg__video${ready ? " tool-video-bg__video--ready" : ""}`}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setReady(true)}
      />
    </div>,
    document.body
  );
}
