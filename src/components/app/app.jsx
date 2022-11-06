import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import api from '../../utils/api';
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
          <BurgerIngredients ingredients={ingredientsData} />
          <BurgerConstructor />
        </main>
      </div>
    </>
  );
}

export default App;
