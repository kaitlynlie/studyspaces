import { useState, useEffect } from 'react';
import { timer } from '../audio';
import clsx from 'clsx';
import styles from './Timer.module.scss'

const TimerDialog = () => {
  const [timeRemaining, setTimeRemaining] = useState(10 * 60); 
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState('');
  const [wasPaused, setWasPaused] = useState(false); // track whether the timer was paused

// manages the running of the timer
// when the `isRunning` or `timeRemaining` state variables change, the effect is triggered, time will decrement by 1 second
// if the time remaining reaches 0, the timeout is cleared, the `isRunning` state variable is set to `false`, and the `playNotificationSound` function is called to play the notification sound

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (isRunning && timeRemaining > 0) {
      timerId = setTimeout(() => {
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

  // called whenever there is a change in the input field for setting a custom time
  const handleTimeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTime(event.target.value);
  };

  //  if the timer is not currently running and was not paused, it parses the `customTime` value or sets a default value of 10 minutes (10 * 60 seconds)
  // `setTimeRemaining` function is used to update the `timeRemaining` state variable with the calculated value
  // `setIsRunning` function is called to set the `isRunning` state variable to `true`
  // `localStorage.setItem` method is used to storethe `customTime` value in the browser's local storage
  //  if the timer was paused (`wasPaused` is `true`) and the `customTime` is not empty, it updates the `timeRemaining` state variable with the new value
  const startTimer = () => {
    if (!isRunning && !wasPaused) {
      const timeInSeconds = parseInt(customTime) * 60 || 10 * 60; // use a default of 10 minutes if customTime is empty
      setTimeRemaining(timeInSeconds);
      setIsRunning(true);
      localStorage.setItem('customTime', customTime);
    } else {
      if (wasPaused && customTime !== '') {
        const timeInSeconds = parseInt(customTime) * 60;
        setTimeRemaining(timeInSeconds);
      }
      setIsRunning(true);
      setWasPaused(false);
    }
  };
 
  // restore the `customTime` value from the browser's local storage when the component is rendered
  useEffect(() => {
    const savedCustomTime = localStorage.getItem('customTime');
    if (savedCustomTime) {
      setCustomTime(savedCustomTime);
    }
  }, []);

  const stopTimer = () => {
    setIsRunning(false);
    setWasPaused(true);
  };

  const resetTimer = () => {
    setTimeRemaining(10 * 60);
    setIsRunning(false);
    setCustomTime('');
    localStorage.removeItem('customTime');
    setWasPaused(false); 
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
    <div className={clsx(styles.timer)}>
      <h2>Pomodoro Timer</h2>
      <div className={clsx(styles.countdown)}>{formatTime(timeRemaining)}</div>
      <div className={clsx(styles.container)}><input
        type="number"
        min={1}
        value={customTime}
        onChange={handleTimeInputChange}
        placeholder="Enter time in minutes"
        className={clsx(styles.input)}
      /></div>

      <div className={clsx(styles.buttons)}>
        {!isRunning && (
          <button
            onClick={startTimer}
            className={clsx(styles.start)}
          >
            Start
          </button>
        )}

        {isRunning && (
          <button
            onClick={stopTimer}
            className={clsx(styles.stop)}
          >
            Stop
          </button>
        )}

        <button
          onClick={resetTimer}
          className={clsx(styles.reset)}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimerDialog;
