import React, { createContext, useState, useEffect, useContext } from 'react';
import { timer } from '../audio';

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const [timeRemaining, setTimeRemaining] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

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

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimeRemaining(1);
    setIsRunning(false);
  };

  const playNotificationSound = () => {
    const audio = new Audio(timer);
    audio.play();
  };

  const timerContextValue = {
    timeRemaining,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
  };

  return (
    <TimerContext.Provider value={timerContextValue}>
      {children}
    </TimerContext.Provider>
  );
};

const TimerDialog = () => {
  const { timeRemaining, isRunning, startTimer, stopTimer, resetTimer } = useContext(TimerContext);
  const [customTime, setCustomTime] = useState('');

  const handleTimeInputChange = (event) => {
    setCustomTime(event.target.value);
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) {
      return '';
    }

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ padding: '10px' }}>
      <h2 style={{ textAlign: 'center', marginTop: '-10px' }}>Pomodoro Timer</h2>
      <div style={{ textAlign: 'center', fontSize: '48px', fontWeight: '800' }}>{formatTime(timeRemaining)}</div>
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

export default function App() {
  return (
    <TimerProvider>
      <div>
        {/* Render other components */}
        <TimerDialog />
      </div>
    </TimerProvider>
  );
}