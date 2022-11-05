import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

function App() {
  return (
    <div className="App">
      <AppHeader className="mb-5" />
      <main className={styles.content}>
        <div className="column">
          <h1 className='text text_type_main-large mt-5 mb-5'>
            Соберите бургер
          </h1>
          <BurgerIngredients />
        </div>

      </main>
    </div>
  );
}

export default App;
