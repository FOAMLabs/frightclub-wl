import * as React from 'react';
import Container from '@mui/material/Container';
import styles from './VideoComponent.module.css';
import { useRouter } from 'next/router';  // Import useRouter from next/router

interface VideoFrameProps {
    videoSrc: string;
    buttonLabel: string;
    handleStepChange: (newStep: number) => void;
    index: number;
    activeStep: number;
}

interface VideoComponentProps {
    handleStepChange: (newStep: number) => void;
    activeStep: number;
    signatureCompleted: boolean;  // Add this line
}

const VideoFrame: React.FC<VideoFrameProps> = ({ videoSrc, buttonLabel, handleStepChange, index, activeStep }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const router = useRouter();  // Instantiate useRouter

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    const handleClick = () => {
        handleStepChange(index);  // Update activeStep when button is clicked
        router.push('/WalletConfirmation');  // Navigate to WalletConfirmation page
    };

    return (
        <div className={styles.frame}>
            <video 
                ref={videoRef} 
                autoPlay 
                muted 
                loop 
                className={styles.video}
                onMouseEnter={handleMouseEnter}  // Attach handleMouseEnter function
                onMouseLeave={handleMouseLeave}  // Attach handleMouseLeave function
            >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <button
                className={styles.button}
                onClick={handleClick}  // Attach handleClick function
                disabled={index > activeStep}
            >
                {buttonLabel}
            </button>
        </div>
    );
};
const VideoComponent: React.FC<VideoComponentProps> = ({ handleStepChange, activeStep }) => {
    const videoData = [
        { src: '/VIDEO_1.mp4', label: 'Connect Wallet', href: '/WalletConfirmation' },
        { src: '/VIDEO_2.mp4', label: 'Verify Google', href: '/page2' },
        { src: '/VIDEO_3.mp4', label: 'Verify Discord', href: '/page3' },
        { src: '/VIDEO_4.mp4', label: 'Trivia', href: '/page4' },
        { src: '/VIDEO_5.mp4', label: 'Completed', href: '/page5' }
    ];
    
    return (
        <Container maxWidth="md" className={styles.container}>
            <div className={styles.hallway}>
                {videoData.map((video, index) => (
                    <div className={styles.videoWrapper} key={index}>
                        <VideoFrame
                            videoSrc={video.src}
                            buttonLabel={video.label}
                            handleStepChange={handleStepChange}
                            index={index}
                            activeStep={activeStep}
                        />
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default VideoComponent;