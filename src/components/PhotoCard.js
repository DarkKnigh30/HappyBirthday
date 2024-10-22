import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Card = styled(motion.div)`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
`;

const TextOnlyCard = styled(Card)`
  padding: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
`;

const MediaContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const Video = styled.video`
  width: 100%;
  height: auto;
  display: block;
`;

const Text = styled.p`
  padding: 15px;
  margin: 0;
  font-size: 1rem;
`;

const HeartOverlay = styled(motion.div)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
`;

const EnlargedMediaContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
`;

const EnlargedImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const EnlargedVideo = styled.video`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const PhotoCard = ({ type, src, alt, text, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isEnlarged, setIsEnlarged] = useState(false);
  const timeoutRef = useRef(null);
  const videoRef = useRef(null);

  const handleClick = () => {
    if (type === 'image') {
      setIsEnlarged(true);
      timeoutRef.current = setTimeout(() => {
        setIsEnlarged(false);
      }, 20000);
    } else if (type === 'video') {
      setIsEnlarged(true);
    }
  };

  useEffect(() => {
    if (isEnlarged && type === 'video' && videoRef.current) {
      videoRef.current.play();
    }
  }, [isEnlarged, type]);

  const handleVideoEnded = () => {
    setIsEnlarged(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (type === 'text') {
    return (
      <TextOnlyCard
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay }}
      >
        {text}
      </TextOnlyCard>
    );
  }

  return (
    <>
      <Card
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay }}
        onClick={handleClick}
      >
        <MediaContainer>
          {type === 'image' ? (
            <Image src={src} alt={alt} />
          ) : (
            <Video autoPlay loop muted playsInline>
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </Video>
          )}
          <HeartOverlay
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            ❤️
          </HeartOverlay>
        </MediaContainer>
        <Text>{text}</Text>
      </Card>
      <AnimatePresence>
        {isEnlarged && (
          <EnlargedMediaContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEnlarged(false)}
          >
            {type === 'image' ? (
              <EnlargedImage src={src} alt={alt} />
            ) : (
              <EnlargedVideo
                ref={videoRef}
                autoPlay
                playsInline
                onClick={(e) => e.stopPropagation()}
                onEnded={handleVideoEnded}
              >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
              </EnlargedVideo>
            )}
          </EnlargedMediaContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoCard;
