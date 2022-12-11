import styles from './reset-password.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../../utils/api';

function ResetPassword() {

  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [isReset, setIsReset] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(password, code);
    api.setNewPassword(password)
      .then((res) => {
        if (res.success) {
          setIsReset(true);
        } else {
          setError(res.message);
        }
      })
      .catch((e) => {
        setError(e.message);
      })
  }

  return (
    <div className={styles.container}>
      <div className={styles['form-wrapper']}>
        <h1 className={`text text_type_main-large ${styles.header}`}>Восстановление пароля</h1>
        {isReset
          ? (
            <p className="text mt-6">Пароль успешно изменен. Перейдите на <Link to="/login" className={`${styles.link}`}>страницу авторизации</Link></p>
          )
          : (
            <form
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <PasswordInput
                name={'password'}
                extraClass="mt-6"
                placeholder="Введите новый пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <Input
                placeholder="Введите код из письма"
                type="text"
                extraClass="mt-6"
                value={code}
                onChange={e => setCode(e.target.value)}
                required
              />
              <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
                Сохранить
              </Button>
              <span className="text">{error}</span>
            </form>
          )}
        <div className={`${styles.options} mt-20`}>
          <p className="text text_color_inactive">Вспомнили пароль? <Link to="/login" className={`${styles.link}`}>Войти</Link></p>
        </div>

      </div>
    </div>
  )
}

export default ResetPassword;
