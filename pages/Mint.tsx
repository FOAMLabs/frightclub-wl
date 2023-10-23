import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useGesture } from "react-use-gesture";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import FrightClubMain from "../components/Home/FrightClubMain";
import TestConnection from "../components/Home/automatedCopy/CheckConnection";
import { AppBar } from "@mui/material";
const Home: NextPage = () => {
  const [flashlightSize, setFlashlightSize] = useState<number>(75);
  const [clickCount, setClickCount] = useState<number>(0);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const router = useRouter();

  const { connectModalOpen } = useConnectModal();

  useEffect(() => {
    console.log("connectModalOpen:", connectModalOpen);
    if (connectModalOpen) {
      setIsWalletConnected(true);
    }
  }, [connectModalOpen]);


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

  return (
    <div className="container" {...bind()}>
      <Head>
        <title>🧛‍♂️ Fright Club 🧟‍♂️</title>
        <meta
          content="3131 animated monsters ready for fun at the Fright Club"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <div className="background-image">
    
        <AppBar />
     
        <FrightClubMain />
        

      <div className="overlay" ref={overlayRef}></div>
      <Link href='/'>
      <Image src="/logo.svg" alt="Logo" width={500} height={200} className="logo" />
      </Link>
      <div className="myfooter">
      <Footer />
      </div>  
    </div>
    </div>
  );
};

export default Home;