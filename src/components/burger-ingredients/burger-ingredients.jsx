import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';
import BurderIngredientCategory from '../burger-ingredient-category/burger-ingredient-category';

function BurgerIngredients(props) {

  const [current, setCurrent] = React.useState('one')

  return (
    <section>
      <div className={`${styles.tabs} mb-10`}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соус
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.content}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <BurderIngredientCategory data={data.filter(item => item.type === 'bun')} />
        <h2 className="text text_type_main-medium">Соусы</h2>
        <BurderIngredientCategory data={data.filter(item => item.type === 'sauce')} />
        <h2 className="text text_type_main-medium">Начинки</h2>
        <BurderIngredientCategory data={data.filter(item => item.type === 'main')} />
      </div>
    </section>
  );
}

export default BurgerIngredients;
