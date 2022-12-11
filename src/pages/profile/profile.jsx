import styles from './profile.module.css';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { logout } from '../../services/actions/user';

function Profile() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { user } = useSelector(store => store.user);

  const [pwd, setPwd] = useState('password');
  const onChange = e => {
    setPwd(e.target.value)
  }

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  const logoutHandler = () => {
    dispatch(logout());
  }

  return (
    <div className={styles.container}>
      <div className="pr-15">
        <nav>
          <ul className={styles.links}>
            <li>
              <NavLink className={`${styles.navlink} text text_type_main-medium`} to="/profile">Профиль</NavLink>
            </li>
            <li>
              <NavLink className={`${styles.navlink} text text_type_main-medium`} to="/profile/orders">История заказов</NavLink>
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
        <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <div className={styles['form-wrapper']}>
        <form className={styles.form}>
          <Input
            placeholder="Имя"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            icon="EditIcon"
          />
          <Input
            placeholder="Логин"
            type="text"
            extraClass="mt-6"
            value={email}
            onChange={e => setEmail(e.target.value)}
            icon="EditIcon"
          />
          <PasswordInput
            name={'password'}
            extraClass="mt-6"
            icon="EditIcon"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}

export default Profile;
