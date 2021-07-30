import { UserButton } from '@clerk/clerk-react';
import React from 'react';

import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <p className={styles.logo}>NoteMate</p>
      <UserButton />
    </nav>
  </header>
);

export default Header;
