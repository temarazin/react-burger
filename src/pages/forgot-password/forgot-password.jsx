import styles from './forgot-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  return (
    <div className={styles.container}>
      <div className={styles['form-wrapper']}>
        <h1 className={`text text_type_main-large ${styles.header}`}>Восстановление пароля</h1>
        <form className={styles.form}>
          <Input placeholder="E-mail" type="email" extraClass="mt-6" />
          <Button htmlType="button" type="primary" size="medium" extraClass="mt-6">
            Восстановить
          </Button>
        </form>
        <div className={`${styles.options} mt-20`}>
          <p className="text text_color_inactive">Вспомнили пароль? <Link to="/login" className={`${styles.link}`}>Войти</Link></p>
        </div>

      </div>
    </div>
  )
}

export default ForgotPassword;
