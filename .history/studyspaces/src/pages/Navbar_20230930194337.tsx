import React from 'react'
import styles from './Navbar.module.scss'
import clsx from 'clsx'
import { title } from '../assets'
import { useState, useEffect } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

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