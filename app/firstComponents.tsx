import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const FirstComponent: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  
  const images = [
    '/Magarmach.png',
    '/Matka.png',
    '/Machli.png',
    '/Makdi.png',
  ];

  const [audioPlayed, setAudioPlayed] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [secondAudioPlayed, setSecondAudioPlayed] = useState(false);

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
        const secondAudio = new Audio('./audio/Intro/Chalo.mp3');
        secondAudio.play().then(() => {
          setSecondAudioPlayed(true);
        }).catch(error => {
          console.error("Failed to play second audio:", error);
        });
      }, 11000);


      return () => {
        clearTimeout(completeTimeout);
        clearTimeout(secondAudioTimeout);
      };
    }
  }, [animationStarted, onComplete]);

  const handleStart = () => {
    setButtonClicked(true);
    const audio = new Audio('./audio/Intro/ma_song.mp3');
    
    audio.play().then(() => {
      setAudioPlayed(true);
    }).catch(error => {
      console.error("Failed to play audio:", error);
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen custom-bg gap-4">
      {!buttonClicked && (
        <button
          onClick={handleStart}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Start
        </button>
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
