import React, { createContext, useState } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timeRemaining, setTimeRemaining] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState('');

  const startTimer = () => {
    const timeInSeconds = parseInt(customTime) * 60;
    setTimeRemaining(timeInSeconds);
    setIsRunning(true);
  };

  const resetTimer = () => {
    setTimeRemaining(1);
    setIsRunning(false);
    setCustomTime('');
  };

  return (
    <TimerContext.Provider
      value={{
        timeRemaining,
        isRunning,
        customTime,
        setTimeRemaining,
        setIsRunning,
        setCustomTime,
        startTimer,
        resetTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};