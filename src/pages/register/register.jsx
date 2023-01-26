import styles from './register.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory  } from 'react-router-dom';
import { registerUser } from '../../services/actions/user';

function Register() {

  const dispatch = useDispatch();
  const { isSuccessRegister, request, requestFailed } = useSelector(store => store.user);
  const history = useHistory();

  // TODO: переделать на что-то более компактное
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(email, password, name));
  }

  useEffect(() => {
    if (isSuccessRegister) {
      history.push('/login');
    }
  }, [isSuccessRegister, history])

  return (
      <div className={styles.container}>
        <div className={styles['form-wrapper']}>
          <h1 className={`text text_type_main-large ${styles.header}`}>Регистрация</h1>
          <form onSubmit={handleSubmit}>
            <fieldset className={styles.form} disabled={request}>
              <Input
                placeholder="Имя"
                type="text"
                extraClass="mt-6"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <Input
                placeholder="E-mail"
                type="email"
                extraClass="mt-6"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <PasswordInput
                extraClass="mt-6"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
                Зарегистрироваться
              </Button>
              {requestFailed && <p className="text mt-6">Что-то пошло не так</p>}
            </fieldset>
          </form>
          <div className={`${styles.options} mt-20`}>
            <p className="text text_color_inactive">Уже зарегистрированы? <Link to="/login" className={`${styles.link}`}>Войти</Link></p>
          </div>

        </div>
      </div>
  )
}

export default Register;
