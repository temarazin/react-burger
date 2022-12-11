import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Switch, Route } from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';

function App() {

  return (
    <>
      <div className="App">
        <AppHeader className="mb-5" />
        <main className={styles.content}>
          <Switch>
            <Route path="/" exact>
              <Main />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
            <Route path="/forgot-password" exact>
              <ForgotPassword />
            </Route>
            <Route path="/reset-password" exact>
              <ResetPassword />
            </Route>
          </Switch>
        </main>
      </div>
    </>
  );
}

export default App;
