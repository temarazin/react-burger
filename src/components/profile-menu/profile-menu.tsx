import styles from './profile-menu.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch } from '../../services/hooks';
import { logout } from '../../services/actions/user';

function ProfileMenu(): JSX.Element {
  const dispatch = useDispatch();

  const logoutHandler = (): void => {
    dispatch<any>(logout());
  }

  return (
    <nav>
      <ul className={styles.links}>
        <li>
          <NavLink
            activeClassName={styles.selected}
            className={`${styles.navlink} text text_type_main-medium`}
            to="/profile"
            exact
          >Профиль</NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={styles.selected}
            className={`${styles.navlink} text text_type_main-medium`}
            to="/profile/orders"
            exact
          >История заказов</NavLink>
        </li>
        <li>
          <button
            className={`${styles.navlink} text text_type_main-medium`}
            type="button"
            onClick={logoutHandler}
          >
            Выход
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default ProfileMenu;
