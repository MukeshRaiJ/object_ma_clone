"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";



const images = ["/Magarmach.png", "/Matka.png", "/Machli.png", "/Makdi.png"];
//const images = {}

const FirstComponent: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const [animationStarted, setAnimationStarted] = useState<boolean>(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [secondAudioPlayed, setSecondAudioPlayed] = useState(false);

  
  const firstAudioRef = useRef<HTMLAudioElement>(null);
  const secondAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioPlayed) {
      const animationTimeout = setTimeout(() => {
        setAnimationStarted(true);
      }, 5000);
      return () => clearTimeout(animationTimeout);
    }
  }, [audioPlayed]);

  useEffect(() => {
    if (animationStarted) {
      const completeTimeout = setTimeout(() => {
        onComplete();
      }, 15000);

      const secondAudioTimeout = setTimeout(() => {
        if (secondAudioRef.current) {
          secondAudioRef.current
            .play()
            .then(() => {
              setSecondAudioPlayed(true);
            })
            .catch((error) => {
              console.error("Failed to play second audio:", error);
            });
        }
      }, 11000);

      return () => {
        clearTimeout(completeTimeout);
        clearTimeout(secondAudioTimeout);
      };
    }
  }, [animationStarted, onComplete]);

  const handleStart = () => {
    setButtonClicked(true);
    if (firstAudioRef.current) {
      firstAudioRef.current
        .play()
        .then(() => {
          setAudioPlayed(true);
        })
        .catch((error) => {
          console.error("Failed to play audio:", error);
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen custom-bg gap-4">
      <audio ref={firstAudioRef} src="./audio/Intro/ma_song.mp3" />
      <audio ref={secondAudioRef} src="./audio/Intro/Chalo.mp3" />
      {!buttonClicked && (
        <div onClick={handleStart} className="cursor-pointer">
          <Image
            src="/play_Button.png"
            alt="Start Button"
            width={100}
            height={100}
          />
        </div>
      )}
      {buttonClicked && (
        <motion.img
          src="/singing.gif"
          alt="Animated GIF"
          className="w-48 h-48"
          initial={{ x: "50%", y: "90%" }}
          animate={{
            x: ["-55%", "-55%", "-55%"],
            y: ["90%", "90%", "90%"],
          }}
          transition={{ duration: 15 }}
        />
      )}
      {animationStarted && (
        <div className="flex gap-4 justify-center items-center">
          {images.map((src, index) => (
            <motion.div
              key={index}
              className="w-48 h-48"
              initial={{ scale: 0, x: "50%", y: "50%" }}
              animate={{
                scale: [0, 1, 0],
                x: ["50%", "-50%", "50%"],
                y: ["50%", "-50%", "50%"],
              }}
              transition={{ duration: 3.4, delay: 2.5 * index }}
            >
              <Image
                src={src}
                alt={`Image ${index + 1}`}
                width={192}
                height={192}
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FirstComponent; 
