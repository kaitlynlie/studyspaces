import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.scss';
import clsx from 'clsx';
import { title } from '../assets';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { TimerDialog, TodoDialog } from '.';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openTodo, setOpenTodo] = useState(false);
  const [openTimer, setOpenTimer] = useState(false);

  // Initialize timer state and customTime in the parent component (Navbar)
  const [timeRemaining, setTimeRemaining] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState('1'); // Initialize with a default value

  const startTimer = () => {
    const timeInMinutes = parseInt(customTime); // Parse minutes from input
    const timeInSeconds = timeInMinutes * 60; // Convert to seconds
    setTimeRemaining(timeInSeconds);
    setIsRunning(true);
  
    localStorage.setItem('customTime', customTime);
  };
  

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimeRemaining(1);
    setIsRunning(false);
    setCustomTime('1'); // Reset to default value
    localStorage.removeItem('customTime');
  };

  // Load customTime from localStorage when the component mounts
  useEffect(() => {
    const savedCustomTime = localStorage.getItem('customTime');
    if (savedCustomTime) {
      setCustomTime(savedCustomTime);
    }
  }, []);

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

  return (
    <nav className={clsx(styles.navbar)}>
      <div className={clsx(styles.toggle)}>
        {toggleMenu ? (
          <RiCloseLine color="#000" size={27} onClick={() => setToggleMenu(false)} />
        ) : (
          <RiMenu3Line color="#000" size={27} onClick={() => setToggleMenu(true)} />
        )}
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

      <Dialog open={openTodo} onClose={handleClose}>
        <DialogActions>
          <RiCloseLine color="#000" size={27} onClick={handleClose} />
        </DialogActions>
        <DialogContent>
          <TodoDialog />
        </DialogContent>
      </Dialog>

      <Dialog open={openTimer} onClose={handleClose}>
        <DialogActions>
          <RiCloseLine color="#000" size={27} onClick={handleClose} />
        </DialogActions>
        <DialogContent>
          {/* Pass down timer state and logic to TimerDialog */}
          <TimerDialog
            timeRemaining={timeRemaining}
            isRunning={isRunning}
            customTime={customTime}
            setCustomTime={setCustomTime}
            startTimer={startTimer}
            stopTimer={stopTimer}
            resetTimer={resetTimer}
          />
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
