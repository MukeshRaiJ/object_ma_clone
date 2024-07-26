"use client"

import React, { useState } from 'react';
import FirstComponent from '../app/firstComponents';
import SecondComponent from '../app/secondComponents';
import './globals.css';

const Home: React.FC = () => {
  const [showSecondComponent, setShowSecondComponent] = useState(false);

  const handleFirstComponentComplete = () => {
    setShowSecondComponent(true);
  };

  return (
    <div>
      {!showSecondComponent ? (
        <FirstComponent onComplete={handleFirstComponentComplete} />
      ) : (
        <SecondComponent />
      )}
    </div>
  );
};

export default Home;
