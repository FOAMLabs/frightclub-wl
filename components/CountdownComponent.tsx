import React from 'react';
import Countdown from 'react-countdown';
import "@rainbow-me/rainbowkit/styles.css";
import 'google-fonts';
import Link from 'next/link';
import Image from 'next/image';


const CountdownComponent: React.FC<{ date: Date }> = ({ date }) => {
  return (
    <div className="countdown-container">
      <div className="countdown">
        <div className='countdown-title'>
            Mint Opens <br />
                October 23rd
                <br />
        </div>
        <Countdown date={date} />
     
        
        <div className="social-links">
          {/* Replace with actual social links */}
          <Link href="https://x.com/frightclub_nft" className="social-link" target="_blank">
            <Image 
            src="/trick.svg" 
            alt="Social Link 2"
            width={200}
            height={80} />
            
          </Link>
        
          <Link href="/FAQ" className="social-link" target="_blank">
            <Image 
            src="/treat.svg" 
            alt="Social Link 2"
            width={200}
            height={80} />
        
          </Link>
        </div>
      </div>
      <style jsx>{`
        .countdown-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100vh;
          opacity: 90%;
        }
        .countdown-title {
            font-family: 'Montserrat Black', sans-serif;
            font-size: 60px;
            color: #B31414;
            text-align: center;
          }

        .countdown {
          font-family: 'Montserrat Black', sans-serif;
          font-size: 80px;
          color: white;
          background-color: #000000;
          text-align: center;
          padding: 40px;
          border-radius: 50px;
        }

        .social-links {
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }

        .social-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: white;
          margin: 0 20px;
        }

        .social-link img {
          width: 50px; // Adjust the size as needed
          height: 50px; // Adjust the size as needed
        }
      `}</style>
    </div>
  );
};

export default CountdownComponent;