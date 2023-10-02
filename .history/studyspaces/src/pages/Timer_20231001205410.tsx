import React, { useState, useEffect } from 'react';
import { timer } from '../audio';

const TimerDialog = () => {
  const [timeRemaining, setTimeRemaining] = useState(1); 
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
    const storedTimeRemaining = localStorage.getItem('timeRemaining');
    const timeInSeconds = parseInt(storedTimeRemaining || customTime, 10) * 60;
  
    if (!isRunning) {
      setTimeRemaining(timeInSeconds);
      setIsRunning(true);
  
      // Remove the stored time from localStorage
      localStorage.removeItem('timeRemaining');
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
  
    // Store the remaining time as a number (in seconds) in localStorage
    localStorage.setItem('timeRemaining', timeRemaining.toString());
  };
  

  const resetTimer = () => {
    setTimeRemaining(1);
    setIsRunning(false);
    setCustomTime('');
    
    localStorage.removeItem('customTime');
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
    <div style={{padding: "10px"}}>
      <h2 style={{textAlign: "center", fontSize: "18px"}}>Pomodoro Timer</h2>
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