import styles from './forgot-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isReset, setIsReset] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    api.resetPassword(email)
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
            <p className="text mt-6">На ваш E-mail отправлен код восстановления. Введите его на <Link to="/reset-password" className={`${styles.link}`}>странице изменения пароля</Link></p>
          )
          : (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
          <Input
            placeholder="E-mail"
            type="email"
            extraClass="mt-6"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
            Восстановить
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

export default ForgotPassword;
