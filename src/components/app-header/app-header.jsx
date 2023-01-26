import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom'
import PropTypes from 'prop-types';

function AppHeader({ className }) {

  const isProfile = !!useRouteMatch('/profile');
  const isConstructor = !!useRouteMatch({ path: '/', exact: true});

  return (
    <header className={`${styles.container} ${className || ''} p-4`}>
      <nav className={styles.container__inner}>
          <ul className={`${styles.menu__list}`}>
            <li className={styles.menu__item}>
              <NavLink to="/" className={`${styles.menu__button} p-5`} activeClassName={styles.menu__button_active} exact>
                <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
                <span className="text text_type_main-default ml-2">Конструктор</span>
              </NavLink>
            </li>
            <li className={styles.menu__item}>
              <a href="/" className={`${styles.menu__button} p-5`}>
                <ListIcon type="secondary" />
                <span className="text text_type_main-default ml-2">Лента заказов</span>
              </a>
            </li>
          </ul>
        <Logo></Logo>
          <ul className={`${styles.menu__list} ${styles.menu__list_secondary}`}>
            <li className={styles.menu__item}>
              <NavLink activeClassName={styles.menu__button_active} to="/profile" className={`${styles.menu__button} p-5`}>
                <ProfileIcon type={isProfile ? "primary" : "secondary"} />
                <span className="text text_type_main-default ml-2">Личный кабинет</span>
              </NavLink>
            </li>
          </ul>
      </nav>

    </header>
  );
}
AppHeader.propType = {
  className: PropTypes.string,
}

export default AppHeader;
