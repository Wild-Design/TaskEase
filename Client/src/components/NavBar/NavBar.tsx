import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className={styles.header}>
      <h1>TaskEase</h1>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to={'/'}>Inicio</Link>
          </li>
          <li>
            <Link to={'#'}>Acerca de</Link>
          </li>
          <li>
            <Link to={'#'}>Mi perfil</Link>
          </li>
          <li>
            <Link to={'#'}>CXerrar sesión</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
