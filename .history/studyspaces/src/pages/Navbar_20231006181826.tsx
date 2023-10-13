import styles from './Navbar.module.scss'
import clsx from 'clsx'
import { todo } from '../assets'
import { useState } from 'react'
import { RiCloseLine, RiArrowGoBackFill } from 'react-icons/ri';
import { Dialog, DialogContent, DialogActions } from '@mui/material'
import { TodoDialog } from '.'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [openTodo, setOpenTodo] = useState(false);
  
  const handleClickOpenTodo = () => {
    setOpenTodo(true);
  };
  
  const handleClose = () => {
    setOpenTodo(false);
  };

  const [nav, setNav] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  return (
    <nav className={clsx(styles.navbar)}>
    <div className={clsx(styles.back)}>
      <Link onClick={openNav} to='/'><li><a><RiArrowGoBackFill color="#000" size={27} /></a></li></Link>
    </div>
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