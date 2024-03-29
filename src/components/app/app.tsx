import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../services/hooks';
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
import { TModalState } from '../../utils/types';
import Feed from '../../pages/feed/feed';
import { OrderInfo } from '../order-info/order-info';

function App() {

  const dispatch = useDispatch();

  const location = useLocation<TModalState>();
  const history = useHistory();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch<any>(getIngredients())
    dispatch<any>(getUser())
  }, [dispatch])

  const handleModalClose = () => {
    history.goBack();
  };

  return (
    <>
      <div className="App">
        <AppHeader extraClass="mb-5" />
        <main className={styles.content}>
          <Switch location={background || location}>
            <Route path="/" exact>
              <Main />
            </Route>
            <Route path="/feed" exact>
              <Feed />
            </Route>
            <Route path="/feed/:orderId" exact>
              <OrderInfo />
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
            <ProtectedRoute path="/profile/orders/:orderId" exact>
              <OrderInfo />
            </ProtectedRoute>
            <Route path="/ingredients/:ingredientId" exact>
              <IngredientDetails />
            </Route>
            <Route path="*">
              <Page404 />
            </Route>
          </Switch>

          {background && (
            <Switch>
              <Route
                path='/ingredients/:ingredientId'
                children={
                  <Modal onClose={handleModalClose}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/feed/:orderId'
                children={
                  <Modal onClose={handleModalClose}>
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:orderId'
                children={
                  <Modal onClose={handleModalClose}>
                    <OrderInfo />
                  </Modal>
                }
              />
            </Switch>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
