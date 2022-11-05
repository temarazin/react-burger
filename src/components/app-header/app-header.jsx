import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader(props) {
  return (
    <header className={`${styles.container} ${props.className || ''} p-4`}>
      <div className={styles.container__inner}>
        <nav className={styles.menu}>
          <ul className={`${styles.menu__list}`}>
            <li className={styles.menu__item}>
              <button className={`${styles.menu__button} ${styles.menu__button_active} p-5`}>
                <BurgerIcon type="primary" />
                <span className="text text_type_main-default ml-2">Конструктор</span>
              </button>
            </li>
            <li className={styles.menu__item}>
            <button className={`${styles.menu__button} p-5`}>
              <ListIcon type="secondary" />
                <span className="text text_type_main-default ml-2">Лента заказов</span>
              </button>
            </li>
          </ul>
        </nav>
        <Logo></Logo>
        <nav className={`${styles.menu} ${styles.menu_justify_end}`}>
          <ul className={`${styles.menu__list}`}>
            <li className={styles.menu__item}>
              <button className={`${styles.menu__button} p-5`}>
                <ProfileIcon type="secondary" />
                <span className="text text_type_main-default ml-2">Личный кабинет</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

    </header>
  );
}

export default AppHeader;
