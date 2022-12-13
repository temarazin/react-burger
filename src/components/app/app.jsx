import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../services/actions/user';
import { getIngredients } from '../../services/actions/ingredients';
import ProtectedRoute from '../hoc/protected-route/protected-route';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import Orders from '../../pages/profile/orders/orders';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Page404 from '../../pages/page-404/page-404';
import Modal from '../modal/modal';

function App() {

  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredients())
    dispatch(getUser())
  }, [])

  const handleModalClose = () => {
    history.goBack();
  };

  return (
    <>
      <div className="App">
        <AppHeader className="mb-5" />
        <main className={styles.content}>
          <Switch location={background || location}>
            <Route path="/" exact>
              <Main />
            </Route>
            <ProtectedRoute auth={false} path="/login" exact>
              <Login />
            </ProtectedRoute>
            <ProtectedRoute auth={false} path="/register" exact>
              <Register />
            </ProtectedRoute>
            <ProtectedRoute auth={false} path="/forgot-password" exact>
              <ForgotPassword />
            </ProtectedRoute>
            <ProtectedRoute auth={false} path="/reset-password" exact>
              <ResetPassword />
            </ProtectedRoute>
            <ProtectedRoute path="/profile" exact>
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute path="/profile/orders" exact>
              <Orders />
            </ProtectedRoute>
            <Route path="/ingredients/:ingredientId" exact>
              <IngredientDetails />
            </Route>
            <Route path="*">
              <Page404 />
            </Route>
          </Switch>

          {background && (
            <Route
              path='/ingredients/:ingredientId'
              children={
                <Modal onClose={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
          )}
        </main>
      </div>
    </>
  );
}

export default App;
