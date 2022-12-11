import styles from './register.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className={styles.container}>
      <div className={styles['form-wrapper']}>
        <h1 className={`text text_type_main-large ${styles.header}`}>Регистрация</h1>
        <form className={styles.form}>
          <Input placeholder="Имя" type="text" extraClass="mt-6" />
          <Input placeholder="E-mail" type="email" extraClass="mt-6" />
          <PasswordInput
            name={'password'}
            extraClass="mt-6"
          />
          <Button htmlType="button" type="primary" size="medium" extraClass="mt-6">
            Зарегистрироваться
          </Button>
        </form>
        <div className={`${styles.options} mt-20`}>
          <p className="text text_color_inactive">Уже зарегистрированы?? <Link to="/login" className={`${styles.link}`}>Войти</Link></p>
        </div>

      </div>
    </div>
  )
}

export default Register;
