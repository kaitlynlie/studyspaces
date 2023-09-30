import React from 'react'
import styles from './Navbar.module.scss'
import clsx from 'clsx'
import { title } from '../assets'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [nav, setNav] = useState(false);

  const openNav = () => {
    setNav(!nav);
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
            <Link onClick={openNav} to='/'><li><a>Home</a></li></Link>
            <Link onClick={openNav} to='/about'><li><a>About</a></li></Link>
            <Link onClick={openNav} to='/membership'><li><a>Todo</a></li></Link>
            <Link onClick={openNav} to='/faq'><li><a>Timer</a></li></Link>
            </ul>
          </div>
        </div>
        )}
        </div>
  </nav>
  )
}

export default Navbar