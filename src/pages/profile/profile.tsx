import styles from './profile.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, useEffect, useState } from 'react';
import { updateUser } from '../../services/actions/user';
import ProfileMenu from '../../components/profile-menu/profile-menu';

function Profile() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEditForm, setIsEditForm] = useState(false);

  const { user, request } = useSelector((store: any) => store.user);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  useEffect(() => {
      setIsEditForm(name !== user.name || email !== user.email || password !== '');
  }, [name, email, user, password])



  const submitHandler = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch<any>(updateUser(email, name, password))
  }

  const cancelHandler = () => {
    setName(user.name);
    setEmail(user.email);
    setPassword('');
  }

  return (
    <div className={styles.container}>
      <div className="pr-15">
        <ProfileMenu />
        <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <div className={styles['form-wrapper']}>
        <form onSubmit={submitHandler}>
          <fieldset className={styles.form} disabled={request}>
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
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {isEditForm && (
              <div className={styles['form-buttons']}>
                <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
                  Сохранить
                </Button>
                <Button htmlType="button" type="secondary" size="medium" extraClass="mt-6" onClick={cancelHandler}>
                  Отменить
                </Button>
              </div>
            )}
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default Profile;
