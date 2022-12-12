import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../services/actions/user';
import { getAccessToken, getRefreshToken } from '../../utils/utils';
import ProtectedRoute from '../hoc/protected-route/protected-route';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import Orders from '../../pages/profile/orders/orders';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser())
  }, [])

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
            <ProtectedRoute path="/profile" exact>
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute path="/profile/orders" exact>
              <Orders />
            </ProtectedRoute>
          </Switch>
        </main>
      </div>
    </>
  );
}

export default App;
