import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function AppHeader(props) {
  return (
    <header className={`${styles.container} ${props.className || ''} p-4`}>
      <nav className={styles.container__inner}>
          <ul className={`${styles.menu__list}`}>
            <li className={styles.menu__item}>
              <a href="/" className={`${styles.menu__button} ${styles.menu__button_active} p-5`}>
                <BurgerIcon type="primary" />
                <span className="text text_type_main-default ml-2">Конструктор</span>
              </a>
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
              <a href="/" className={`${styles.menu__button} p-5`}>
                <ProfileIcon type="secondary" />
                <span className="text text_type_main-default ml-2">Личный кабинет</span>
              </a>
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
