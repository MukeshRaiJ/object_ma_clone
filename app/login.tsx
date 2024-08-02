"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ImageReveal = () => {
  const images = [
    {
      id: 1,
      silhouette: "/emptyMagarmach.png",
      colored: "/magarmach.png",
      sound: "./audio/Intro/Ma se magarmach.mp3",
    },
    {
      id: 2,
      silhouette: "/emptyMatka.png",
      colored: "/matka.png",
      sound: "./audio/Intro/Ma se matka.mp3",
    },
    {
      id: 3,
      silhouette: "/emptyMachli.png",
      colored: "/machli.png",
      sound: "./audio/Intro/Ma se machli.mp3",
    },
    {
      id: 4,
      silhouette: "/emptyMakdi.png",
      colored: "/makdi.png",
      sound: "./audio/Intro/Ma se makdi.mp3",
    },
  ];

  const [revealedImages, setRevealedImages] = useState<number[]>([]);
  const [canInteract, setCanInteract] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Auto-play background audio on component load
    const bgAudio = new Audio("./audio/Intro/bg_music.mp3");
    bgAudio.loop = true;
    bgAudio.play().catch((error) => console.error("Error playing audio:", error));
    
    return () => {
      bgAudio.pause();
      bgAudio.currentTime = 0;
    };
  }, []);

  const handleReveal = (id: number, sound: string) => {
    if (!canInteract) return;

    const newRevealedImages = revealedImages.includes(id)
      ? revealedImages.filter((imageId) => imageId !== id)
      : [...revealedImages, id];

    setRevealedImages(newRevealedImages);
    setCanInteract(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    audioRef.current = new Audio(sound);
    audioRef.current.play().then(() => {
      audioRef.current!.addEventListener("ended", () => setCanInteract(true));
    }).catch((error) => {
      console.error("Error playing audio:", error);
      setCanInteract(true);
    });
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen custom-bg gap-4 relative"
      style={{
        backgroundImage: `url('/background.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* GIF Image */}
      <Image
        src="/idle.gif" // Replace with the actual path to idle.gif
        alt="Idle"
        className="absolute bottom-0 left-2 w-50 h-55"
        style={{ zIndex: 15 }} // Ensures the gif stays on top
        width={200}
        height={200}
      />

      {images.map((image) => (
        <motion.div
          key={image.id}
          className="relative w-64 h-64 cursor-pointer"
          onClick={() => handleReveal(image.id, image.sound)}
          animate={{ rotateY: revealedImages.includes(image.id) ? 180 : 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ perspective: 1000 }}
        >
          {/* Colored Image */}
          <motion.div
            className="absolute w-full h-full backface-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: revealedImages.includes(image.id) ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={image.colored}
              alt="Colored"
              layout="fill"
              objectFit="cover"
            />
          </motion.div>

          {/* Black Silhouette */}
          <motion.div
            className="absolute w-full h-full backface-hidden"
            style={{
              filter: "brightness(0) invert(0)",
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: revealedImages.includes(image.id) ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={image.silhouette}
              alt="Silhouette"
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default ImageReveal;
