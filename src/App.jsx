import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import Modal from './components/modal/modal';
import OrderDetails from './components/order-details/order-details';
import IngredientDetails from './components/ingredient-details/ingredient-details';
import api from './utils/api';
import { useState, useEffect } from 'react';

function App() {

  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    api.getIngredients()
      .then(res => setIngredientsData(res.data))
      .catch(e => console.log(e));
  }, [])

  return (
    <>
      <div className="App">
        <AppHeader className="mb-5" />
        <main className={styles.content}>
          <div>
            <h1 className='text text_type_main-large mt-5 mb-5'>
              Соберите бургер
            </h1>
            <BurgerIngredients ingredients={ingredientsData} />
          </div>
          <div>
            <BurgerConstructor />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
