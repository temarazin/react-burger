import styles from './login.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, useState } from 'react';
import { login } from '../../services/actions/user';

function Login() {

  const dispatch = useDispatch();
  const { request, requestFailed } = useSelector((store:any) => store.user);

  // TODO: переделать на что-то более компактное
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch<any>(login(email, password));
  }

  return (
    <div className={styles.container}>
      <div className={styles['form-wrapper']}>
        <h1 className={`text text_type_main-large ${styles.header}`}>Вход</h1>
        <form onSubmit={handleSubmit}>
          <fieldset className={styles.form} disabled={request}>
            <Input
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              extraClass="mt-6"
            />
            <PasswordInput
              value={password}
              onChange={e => setPassword(e.target.value)}
              extraClass="mt-6"
            />
            <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
              Войти
            </Button>
            {requestFailed && <p className="text mt-6">Что-то пошло не так</p>}
          </fieldset>
        </form>
        <div className={`${styles.options} mt-20`}>
          <p className="text text_color_inactive">Вы — новый пользователь? <Link to="/register" className={`${styles.link}`}>Зарегистрироваться</Link></p>
          <p className="text text_color_inactive mt-4">Забыли пароль? <Link to="/forgot-password" className={`${styles.link}`}>Восстановить пароль</Link></p>
        </div>

      </div>
    </div>
  )
}

export default Login;
