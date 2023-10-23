// VideoComponent.tsx
import React from 'react';
import Container from '@mui/material/Container';
import styles from './VideoComponent.module.css';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

interface VideoFrameProps {
    videoSrc: string;
    buttonLabel: string;
    href: string;
}

interface VideoComponentProps {
    signatureCompleted: boolean;
}

const VideoFrame: React.FC<VideoFrameProps> = ({ videoSrc, buttonLabel, href }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const router = useRouter();

    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => console.error(error));
        }
    }, []);

    const handleClick = () => {
        router.push(href);
    };

    return (
        <div className={styles.frame}>
            <video 
                ref={videoRef} 
                autoPlay 
                muted 
                loop 
                playsInline  // Add this to ensure autoplay on mobile
                className={styles.video}
            >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <Button
                className={styles.button}
                onClick={handleClick}
            >
                {buttonLabel}
            </Button>
        </div>
    );
}

const VideoComponent: React.FC<VideoComponentProps> = ({ signatureCompleted }) => {
    const videoData = [
        { videoSrc: '/VIDEO_1.mp4', buttonLabel: 'whitelist quiz', href: '/WalletConfirmation' },
        { videoSrc: '/VIDEO_2.mp4', buttonLabel: 'Mint', href: '/MintingPage' },
        { videoSrc: '/VIDEO_3.mp4', buttonLabel: 'User Portal', href: '/UserPortal' },
        { videoSrc: '/VIDEO_4.mp4', buttonLabel: 'Retry Trivia', href: '/Questionairre' },
        { videoSrc: '/VIDEO_5.mp4', buttonLabel: 'FAQ', href: '/FAQ' }
    ];

    return (
        <Container maxWidth="md" sx={{ backgroundColor: 'black' }} className={styles.container}>
            <div className={styles.hallway}>
                {videoData.map((video, index) => (
                    <div className={styles.videoWrapper} key={index}>
                        <VideoFrame
                            videoSrc={video.videoSrc}
                            buttonLabel={video.buttonLabel}
                            href={video.href}
                        />
                    </div>
                ))}
            </div>
        </Container>
    );
}

export default VideoComponent;