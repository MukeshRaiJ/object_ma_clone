"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ImageReveal = () => {
  // Array of image data containing silhouette, colored image, and sound for each item
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

  // usRefs to manage background and sound audio elements
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const soundAudioRef = useRef<HTMLAudioElement | null>(null);

  // State to keep track of which images have been revealed
  const [revealedImages, setRevealedImages] = useState<number[]>([]);

  // Effect to play background music on component mount and stop it on unmount
  useEffect(() => {
    bgAudioRef.current = new Audio("./audio/Intro/bg_music.mp3");
    bgAudioRef.current.loop = true; // Loop the background music
    bgAudioRef.current.play();
  }, []);

  // Handler function to toggle image reveal and play associated sound
  const handleReveal = (id: number, sound: string) => {
    if (!revealedImages.includes(id)) {
      // If the image is not revealed, add it to the list of revealed images
      setRevealedImages([...revealedImages, id]);
    } else {
      // If the image is already revealed, remove it from the list
      setRevealedImages(revealedImages.filter((imageId) => imageId !== id));
    }

    soundAudioRef.current = new Audio(sound);
    soundAudioRef.current.play();
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen custom-bg gap-4"
      style={{
        backgroundImage: `url('/background.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src="/idle.gif"
        alt="Idle"
        className="absolute bottom-0 left-2 w-50 h-55"
        style={{ zIndex: 15 }} // Ensures the idle GIF appears above other content
      />
      {images.map((image) => (
        <motion.div
          key={image.id}
          className="relative w-64 h-64 cursor-pointer"
          onClick={() => handleReveal(image.id, image.sound)} // Toggle reveal on click
          animate={{ rotateY: revealedImages.includes(image.id) ? 180 : 0 }} // 3D rotation for reveal effect
          transition={{ duration: 0.6 }} // Duration of the rotation animation
          style={{ perspective: 1000 }} // Perspective for 3D effect
        >
          <motion.img
            src={image.colored}
            alt="Colored"
            className="absolute w-full h-full backface-hidden"
            initial={{ opacity: 0 }} // Initially hidden
            animate={{ opacity: revealedImages.includes(image.id) ? 1 : 0 }} // Fade in/out based on reveal state
            transition={{ duration: 0.3 }} // Duration of the fade animation
          />
          <motion.img
            src={image.silhouette}
            alt="Silhouette"
            className="absolute w-full h-full backface-hidden"
            style={{
              filter: "brightness(0) invert(0)", // Default styling for silhouette
            }}
            initial={{ opacity: 1 }} // Initially visible
            animate={{ opacity: revealedImages.includes(image.id) ? 0 : 1 }} // Fade in/out based on reveal state
            transition={{ duration: 0.3 }} // Duration of the fade animation
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ImageReveal;
