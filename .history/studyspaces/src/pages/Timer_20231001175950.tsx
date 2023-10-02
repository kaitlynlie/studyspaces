import React, { useEffect } from 'react';
import { timer } from '../audio';

interface TimerDialogProps {
  timeRemaining: number;
  isRunning: boolean;
  customTime: string;
  setCustomTime: (value: string) => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

const TimerDialog = ({
  timeRemaining,
  isRunning,
  customTime,
  setCustomTime,
  startTimer,
  stopTimer,
  resetTimer,
}: TimerDialogProps) => {
useEffect(() => {
  let timerId;

  if (isRunning && timeRemaining > 0) {
    timerId = setInterval(() => {
      setCustomTime((prevTime) => {
        const newTime = parseInt(prevTime) - 1;
        if (newTime === 0) {
          // Stop the timer when it reaches 0
          stopTimer();
          playNotificationSound();
          clearInterval(timerId); // Clear the interval
        }
        return newTime.toString();
      });
    }, 1000);
  }

  return () => clearInterval(timerId);
}, [isRunning, timeRemaining, stopTimer, setCustomTime]);


  const handleTimeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTime(event.target.value);
  };

  const formatTime = (timeInSeconds: number) => {
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
    <div style={{ padding: '10px' }}>
      <h2 style={{ textAlign: 'center', marginTop: '-10px' }}>Pomodoro Timer</h2>
      <div style={{ textAlign: 'center', fontSize: '48px', fontWeight: '800' }}>
        {formatTime(parseInt(customTime))}
      </div>
      <input
  type="number"
  min={1}
  step={1} // Set the step to 1 minute
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
