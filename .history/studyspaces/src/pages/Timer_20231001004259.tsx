import React, { useState, useEffect } from 'react';
import { timer } from '../audio';

const TimerDialog = () => {
  const [timeRemaining, setTimeRemaining] = useState(10); 
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState('');

  useEffect(() => {
    let timerId;

    if (isRunning && timeRemaining > 0) {
      timerId = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    }

    localStorage.setItem('timeRemaining', timeRemaining.toString());

    if (timeRemaining === 0) {
      clearInterval(timerId);
      setIsRunning(false);
      playNotificationSound(); 
    }

    const storedTimeRemaining = localStorage.getItem('timeRemaining');
    if (storedTimeRemaining) {
      setTimeRemaining(parseInt(storedTimeRemaining));
    }

    return () => clearInterval(timerId);
  }, [isRunning, timeRemaining]);

  const handleTimeInputChange = (event) => {
    setCustomTime(event.target.value);
  };

  const startTimer = () => {
    const storedTimeRemaining = localStorage.getItem('timeRemaining');
    const isPlaceholder = storedTimeRemaining === '10'; // assuming the placeholder is '10'
    const timeInSeconds = isPlaceholder ? parseInt(customTime) * 60 : parseInt(storedTimeRemaining);
    setTimeRemaining(timeInSeconds);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimeRemaining(10);
    setIsRunning(false);
    setCustomTime(''); 
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
      <h2 style={{textAlign: "center", marginTop: "-10px"}}>Pomodoro Timer</h2>
      <div style={{textAlign: 'center', fontSize: "48px", fontWeight: "800"}}>{formatTime(timeRemaining)}</div>
      <input
  type="number"
  min={1}
  value={customTime}
  onChange={handleTimeInputChange}
  placeholder="Enter time in minutes"
  style={{
    marginTop: '20px',
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '200px',
  }}
/>

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
  );
};

export default TimerDialog;