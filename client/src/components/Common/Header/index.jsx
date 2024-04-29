import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BsChevronDown } from 'react-icons/bs';

import Logo from '../Logo';

import styles from '../../../styles/modules/header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user.value);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <Logo />
      <button className={styles.menu} onClick={() => setMenuOpen(!menuOpen)}>
        <div className={styles.menu__userImg}>
          <img src={user.image} alt='' />
        </div>
        <div className={styles.menu__username}>
          <p>{user.name}</p>
        </div>
        <div className={styles.menu__arrow}>
          <BsChevronDown />
        </div>
        {menuOpen && (
          <div className={styles.menu__dropdown}>
            <div
              className={styles.menu__dropdown__overlay}
              onClick={() => setMenuOpen(false)}
            ></div>
            <div className={styles.menu__dropdown__items}>
              <Link className={styles.dropdown__item} to='/login' onClick={handleSignOut}>
                Logout
              </Link>
            </div>
          </div>
        )}
      </button>
      <div className={styles.mobileMenu}>
        {menuOpen && (
          <>
            <div className={styles.cover} onClick={() => setMenuOpen(false)}></div>
            <nav className={`${styles.mobileMenu__nav} ${menuOpen ? styles.navOpen : ''}`}>
              <div className={styles.actions}>
                <ul className={styles.actions__ul}>
                  <li className={styles.actions__li}>
                    <Link to='/login' onClick={handleSignOut}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={styles.profile}>
                <Link to='#'>
                  <div className={styles.profile__img}>
                    <img src={user.image} alt='' />
                  </div>
                  <div className={styles.profile__name}>
                    <p>{user.name}</p>
                  </div>
                </Link>
              </div>
            </nav>
          </>
        )}
        <button
          className={`${styles.mobileMenu__btn} ${menuOpen ? styles.mobileMenu__open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
