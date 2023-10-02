import React from 'react'
import styles from './Navbar.module.scss'
import clsx from 'clsx'
import { title, todo } from '../assets'
import { useState, useEffect } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';
import { TimerDialog, TodoDialog } from '.'

const Navbar = () => {
  const [openTodo, setOpenTodo] = useState(false);
  
  const handleClickOpenTodo = () => {
    setOpenTodo(true);
  };
  
  const handleClose = () => {
    setOpenTodo(false);
  };

  return (
    <nav className={clsx(styles.navbar)}>
    <div className={clsx(styles.toggle)}>
      <a onClick={handleClickOpenTodo}><img src={todo} /></a>
        </div>

    <Dialog open={openTodo} onClose={handleClose}>
      <DialogActions>
      <RiCloseLine color="#000" size={27} onClick={handleClose} />
      </DialogActions>
      <DialogContent>
        <TodoDialog />
      </DialogContent>
    </Dialog>
  </nav>
  )
}

export default Navbar