import type { NextPage } from "next";
import Head from "next/head";
import {useAccount} from 'wagmi';
import { useState, useEffect, useRef } from "react";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useGesture } from "react-use-gesture";
import MintNFTComponent from "../components/Mint/MintingComponent";
import { AppBar, Card, CardContent, CircularProgress} from "@mui/material";
import AppMenu from "../components/Header";

const Home: NextPage = () => {
  const [flashlightSize, setFlashlightSize] = useState<number>(75);
  const [clickCount, setClickCount] = useState<number>(0);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const [isWalletConnected, setIsWalletConnected] = useState(false);


  const { connectModalOpen } = useConnectModal();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);


  const isUserLoggedIn = useAccount().isConnected; // Modify this based on your actual user authentication logic

  useEffect(() => {
    console.log("connectModalOpen:", connectModalOpen);
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

      <div className="background-image-z">
      <AppMenu />
       
     
      {isLoading ? (
          <Card>
            <CardContent style={{ textAlign: 'center' }}>
              <CircularProgress />
              <div>Loading...</div>
            </CardContent>
          </Card>
        ) : (
          isUserLoggedIn ? (
            <MintNFTComponent />
          ) : (
            // Render other content if the user is not logged in
            <div>
              {/* ... (your other content) */}
            </div>
          )
        )}

      <div className="overlay" ref={overlayRef}></div>

    </div>
    </div>
  );
};

export default Home;