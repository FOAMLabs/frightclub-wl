import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGesture } from "react-use-gesture";
import XCard from "./Xcard";


const XPath: React.FC = () => {
  const [flashlightSize, setFlashlightSize] = useState<number>(75);
  const [clickCount, setClickCount] = useState<number>(0);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const bind = useGesture({
    onMove: ({ xy: [x, y] }) => {
      const overlay = overlayRef.current;
      if (overlay) {
        overlay.style.setProperty("--x", `${x}px`);
        overlay.style.setProperty("--y", `${y}px`);
        overlay.style.setProperty("--size", `${flashlightSize}px`);
      }
    },
    onClick: (event) => {
      if (event.event.target instanceof HTMLElement) {
        const targetElement = event.event.target as HTMLElement;
        if (!targetElement.closest("a, button")) {
          if (clickCount === 3) {
            setFlashlightSize(75);
            setClickCount(0);
          } else {
            setFlashlightSize((prevSize) => prevSize * 1.5);
            setClickCount((prevCount) => prevCount + 1);
          }
        }
      }
    },
  });

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const overlay = overlayRef.current;
      if (overlay) {
        const gamma = event.gamma; // [-90, 90]
        const beta = event.beta; // [-180, 180]

        if (gamma !== null && beta !== null) {
          const x = (gamma + 90) * (window.innerWidth / 180);
          const y = (beta + 180) * (window.innerHeight / 360);

          overlay.style.setProperty("--x", `${x}px`);
          overlay.style.setProperty("--y", `${y}px`);
        }
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);
  const handleStartTwitterAPI = () => {
    // This initiates the sign-in process
    window.location.href = 'http://localhost:3000/auth/twitter';
    console.log("Starting Twitter API process...");
  };

  return (
    <div className="background-image-x" {...bind()}>
      <div>
      </div>

      <div className="overlay" ref={overlayRef}></div>

      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={500} height={200} className="logo" />
      </Link>

      <XCard onStartXAPI={handleStartTwitterAPI} /> {/* Render the TwitterCard component */}
    </div>
  );
};

export default XPath;