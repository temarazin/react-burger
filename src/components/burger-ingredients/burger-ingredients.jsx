import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurderIngredientCategory from '../burger-ingredient-category/burger-ingredient-category';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useState } from 'react';

function BurgerIngredients(props) {

  const [current, setCurrent] = React.useState('one')
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [currentIngredient, setCurrentIgredient] = useState({});

  const closeModal = () => {
    setIsModalOpened(false);
  }

  const showIngredient = (id) => {
    console.log(props.ingredients.find(item => item._id === id));
    setCurrentIgredient(props.ingredients.find(item => item._id === id));
    setIsModalOpened(true);
  }

  const modal = (
    <Modal title="Детали ингредиента" onClose={closeModal}>
      <IngredientDetails currentIngredient={currentIngredient} />
    </Modal>
  )

  return (
    <>
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
          <BurderIngredientCategory data={props.ingredients.filter(item => item.type === 'bun')} onIndegrientClick={showIngredient} />
          <h2 className="text text_type_main-medium">Соусы</h2>
          <BurderIngredientCategory data={props.ingredients.filter(item => item.type === 'sauce')} onIndegrientClick={showIngredient} />
          <h2 className="text text_type_main-medium">Начинки</h2>
          <BurderIngredientCategory data={props.ingredients.filter(item => item.type === 'main')} onIndegrientClick={showIngredient} />
        </div>
      </section>
      {isModalOpened && modal}
    </>
  );
}
BurgerIngredients.defaultProps = {ingredients: []};

export default BurgerIngredients;
