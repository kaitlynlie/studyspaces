import React, { useState, useEffect } from 'react';

const TimerDialog = ({ isVisible, onClose }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerId;

    if (isRunning && timeRemaining > 0) {
      timerId = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      // Timer has reached 0, perform any actions needed
      // For example, playing a sound or triggering an event
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [isRunning, timeRemaining]);

  useEffect(() => {
    if (isVisible) {
      startTimer();
    } else {
      stopTimer();
    }
  }, [isVisible]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimeRemaining(0);
    setIsRunning(false);
  };

  const handleTimerDialogClose = () => {
    onClose();
    resetTimer();
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      {isVisible && (
        <div>
          <h2>Pomodoro Timer</h2>
          <div>{formatTime(timeRemaining)}</div>
          <button onClick={handleTimerDialogClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default TimerDialog;