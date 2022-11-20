import React, { useEffect, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurderIngredientCategory from '../burger-ingredient-category/burger-ingredient-category';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients, SET_CURRENT_INGREDIENT } from '../../services/actions/ingredients';

function BurgerIngredients() {
  const dispatch = useDispatch();

  const { ingredients, currentIngredient } = useSelector(store => store.ingredients);

  const [current, setCurrent] = React.useState('one')
  const [isModalOpened, setIsModalOpened] = useState(false);

  const closeModal = () => {
    setIsModalOpened(false);
    dispatch({ type: SET_CURRENT_INGREDIENT, ingredient: null })
  }

  const showIngredient = (id) => {
    dispatch({ type: SET_CURRENT_INGREDIENT, ingredient: ingredients.find(item => item._id === id) })
    setIsModalOpened(true);
  }

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  const modal = (
    <Modal title="Детали ингредиента" onClose={closeModal}>
      <IngredientDetails currentIngredient={currentIngredient} />
    </Modal>
  )

  return (
    <>
      <section>
        <h1 className='text text_type_main-large mt-5 mb-5'>
          Соберите бургер
        </h1>
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
          <BurderIngredientCategory data={ingredients.filter(item => item.type === 'bun')} onIndegrientClick={showIngredient} />
          <h2 className="text text_type_main-medium">Соусы</h2>
          <BurderIngredientCategory data={ingredients.filter(item => item.type === 'sauce')} onIndegrientClick={showIngredient} />
          <h2 className="text text_type_main-medium">Начинки</h2>
          <BurderIngredientCategory data={ingredients.filter(item => item.type === 'main')} onIndegrientClick={showIngredient} />
        </div>
      </section>
      {isModalOpened && modal}
    </>
  );
}

export default BurgerIngredients;
