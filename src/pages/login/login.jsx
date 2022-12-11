import styles from './login.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles['form-wrapper']}>
        <h1 className={`text text_type_main-large ${styles.header}`}>Вход</h1>
        <form className={styles.form}>
          <Input placeholder="E-mail" type="email" extraClass="mt-6" />
          <PasswordInput
            name={'password'}
            extraClass="mt-6"
          />
          <Button htmlType="button" type="primary" size="medium" extraClass="mt-6">
            Войти
          </Button>
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
