import React from 'react'
import styles from './Navbar.module.scss'
import clsx from 'clsx'
import { title } from '../assets'
import { useState, useEffect } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

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

  
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openTodo, setOpenTodo] = useState(false);
  
  const handleClickOpenTodo = () => {
    setOpenTodo(true);
  };
  
  const handleClickOpenTimer = () => {
    setOpenTimer(true);
  };
  
  const handleClose = () => {
    setOpenTodo(false);
    setOpenTimer(false);
  };
  
  //timer

  const [openTimer, setOpenTimer] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerValue, setTimerValue] = useState(25 * 60); // Initial timer value in seconds
  const [minutes, setMinutes] = useState('25');
  const [seconds, setSeconds] = useState('00');

  const formatTime = (value) => {
    const mins = Math.floor(value / 60).toString().padStart(2, '0');
    const secs = (value % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  
  const startTimer = () => {
    setTimerRunning(true);
  };
  
  const pauseTimer = () => {
    setTimerRunning(false);
  };
  
  const resetTimer = () => {
    setTimerValue(25 * 60);
    setMinutes('25');
    setSeconds('00');
    setTimerRunning(false);
  };
  
  useEffect(() => {
    let intervalId;
    
    if (timerRunning) {
      intervalId = setInterval(() => {
        setTimerValue((prevValue) => prevValue - 1);
      }, 1000);
    }
  
    if (timerValue === 0) {
      setTimerRunning(false);
      // Timer completed, perform any necessary actions here
    }
  
    const formattedTime = formatTime(timerValue);
    const [formattedMinutes, formattedSeconds] = formattedTime.split(':');
    setMinutes(formattedMinutes);
    setSeconds(formattedSeconds);
  
    return () => {
      clearInterval(intervalId);
    };
  }, [timerRunning, timerValue]);

  return (
    <nav className={clsx(styles.navbar)}>
    <div className={clsx(styles.toggle)}>
        {toggleMenu
          ? <RiCloseLine color="#000" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#000" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className={clsx(styles.box)}>
          <div className="none">
            <ul className={clsx(styles.dropdown)}>
              <li>
                <a onClick={handleClickOpenTodo}>Todo</a>
              </li>
              <li>
                <a onClick={handleClickOpenTimer}>Timer</a>
              </li>
            </ul>
          </div>
        </div>
        )}
        </div>

    {/* Todo Dialog */}
    <Dialog open={openTodo} onClose={handleClose}>
      <DialogActions>
      <RiCloseLine color="#000" size={27} onClick={handleClose} />
      </DialogActions>
      <DialogTitle>Todo</DialogTitle>
      <DialogContent>
        {/* Add your content for the Todo dialog here */}
      </DialogContent>
    </Dialog>

    {/* Timer Dialog */}
    <Dialog open={openTimer} onClose={handleClose} >
      <DialogActions>
      <RiCloseLine color="#000" size={27} onClick={handleClose} />
      </DialogActions>
      <DialogTitle>Timer</DialogTitle>
      <DialogContent>
        {/* Add your content for the Timer dialog here */}
      </DialogContent>
    </Dialog>
  </nav>
  )
}

export default Navbar