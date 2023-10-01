import React, { useState, useEffect } from 'react';

const TimerDialog = () => {
  const [timeRemaining, setTimeRemaining] = useState(1500); // Default: 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState('');

  useEffect(() => {
    let timerId;

    if (isRunning && timeRemaining > 0) {
      timerId = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    }

    if (timeRemaining === 0) {
      // Timer has completed, perform any necessary actions here
      clearInterval(timerId);
      setIsRunning(false);
    }

    return () => clearInterval(timerId); // Clean up the interval on unmount or when the timer stops
  }, [isRunning, timeRemaining]);

  const handleTimeInputChange = (event) => {
    setCustomTime(event.target.value);
  };

  const startTimer = () => {
    const timeInSeconds = parseInt(customTime) * 60; // Convert minutes to seconds
    setTimeRemaining(timeInSeconds);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimeRemaining(1500); // Reset to default time (25 minutes)
    setIsRunning(false);
    setCustomTime(''); // Clear the custom time input field
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };