import React from 'react'
import styles from './Navbar.module.scss'
import clsx from 'clsx'
import { title } from '../assets'
import { useState, useEffect } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { TimerDialog, TodoDialog } from '.'

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openTodo, setOpenTodo] = useState(false);
  const [openTimer, setOpenTimer] = useState(false);
  
  const handleClickOpenTodo = () => {
    setOpenTodo(true);
  };
  
  const handleClickOpenTimer = () => {
    setOpenTimer(true);
    console.log("JFOI;JDSOFI;JDSA");
  };
  
  const handleClose = () => {
    setOpenTodo(false);
    setOpenTimer(false);
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
          <TimerDialog open={openTimer} />
        </DialogContent>
      </Dialog>
  </nav>
  )
}

export default Navbar