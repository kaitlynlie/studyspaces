import React, { useState, useEffect } from 'react';
import { timer } from '../audio';
import clsx from 'clsx';
import styles from './Timer.module.scss'

const TimerDialog = () => {
  const [timeRemaining, setTimeRemaining] = useState(10 * 60); 
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState('');
  const [wasPaused, setWasPaused] = useState(false); // Track whether the timer was paused

  useEffect(() => {
    let timerId;

    if (isRunning && timeRemaining > 0) {
      timerId = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    }

    if (timeRemaining === 0) {
      clearInterval(timerId);
      setIsRunning(false);
      playNotificationSound(); 
    }

    return () => clearInterval(timerId);
  }, [isRunning, timeRemaining]);

  const handleTimeInputChange = (event) => {
    setCustomTime(event.target.value);
  };

  const startTimer = () => {
    if (!isRunning && !wasPaused) {
      // Parse the customTime or set a default value if it's empty
      const timeInSeconds = parseInt(customTime) * 60 || 10 * 60; // Use a default of 10 minutes if customTime is empty
      setTimeRemaining(timeInSeconds);
      setIsRunning(true);
      localStorage.setItem('customTime', customTime);
    } else {
      // Check if the timer was paused and customTime is modified
      if (wasPaused && customTime !== '') {
        const timeInSeconds = parseInt(customTime) * 60;
        setTimeRemaining(timeInSeconds);
      }
      setIsRunning(true);
      setWasPaused(false);
    }
  };
  
  

  useEffect(() => {
    const savedCustomTime = localStorage.getItem('customTime');
    if (savedCustomTime) {
      setCustomTime(savedCustomTime);
    }
  }, []);

  const stopTimer = () => {
    setIsRunning(false);
    setWasPaused(true); // Set the flag to indicate the timer was paused
  };

  const resetTimer = () => {
    setTimeRemaining(10 * 60);
    setIsRunning(false);
    setCustomTime('');
    localStorage.removeItem('customTime');
    setWasPaused(false); // Reset the pause flag
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) {
      return '';
    }
  
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
  
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const playNotificationSound = () => {
    const audio = new Audio(timer);
    audio.play();
  };

  return (
    <div className={clsx(styles.timer)}>
      <h2>Pomodoro Timer</h2>
      <div style={{textAlign: 'center', fontSize: "48px", fontWeight: "800", marginTop: "-10px"}}>{formatTime(timeRemaining)}</div>
      <input
        type="number"
        min={1}
        value={customTime}
        onChange={handleTimeInputChange}
        placeholder="Enter time in minutes"
        style={{
          marginTop: '10px',
          marginBottom: '10px',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          width: '200px',
        }}
      />

      <div style={{display: 'flex', justifyContent: 'center'}}>
        {!isRunning && (
          <button
            onClick={startTimer}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#8D6E63',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Start
          </button>
        )}

        {isRunning && (
          <button
            onClick={stopTimer}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#D7CCC8',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Stop
          </button>
        )}

        <button
          onClick={resetTimer}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#607D8B',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimerDialog;
