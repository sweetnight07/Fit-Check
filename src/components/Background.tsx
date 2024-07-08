import React, { useEffect, useRef } from "react";
import "../assets/styles/background.css";
import videoBg from "../assets/images/background.mp4";

const Background: React.FC = () => {
  // reference to video to control playback
  const videoRef = useRef<HTMLVideoElement>(null);
  // reference to id of the animation frame so it can be removed when unmount
  const requestRef = useRef<number>();
  // reference to forward or reversal
  const forwardRef = useRef(true);

  const animate = () => {
    const video = videoRef.current;

    if (video) {
      const duration = video.duration;
      const currentTime = video.currentTime;
      // when it reaches the end
      if (forwardRef.current && currentTime >= duration * 0.9) {
        forwardRef.current = false;
      } else if (!forwardRef.current && currentTime <= duration * 0.4) {
        // when it reaches the midpoint
        forwardRef.current = true;
      }
      // change the playback speed
      if (forwardRef.current) {
        // normal playback
        video.playbackRate = 1;
      } else {
        // reverse playback
        video.playbackRate = 0; // html does not support -1 playback
        // decrement it using animation frames
        const reverseStep = 0.1; // ~33ms step to simulate ~30 FPS reverse playback
        video.currentTime = currentTime - reverseStep;
      }
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div>
      <video className="background" ref={videoRef} muted playsInline autoPlay>
        <source src={videoBg} type="video/mp4" />
      </video>
    </div>
  );
};

export default Background;
