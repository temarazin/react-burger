import React, { useEffect, useState, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurderIngredientCategory from '../burger-ingredient-category/burger-ingredient-category';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients, SET_CURRENT_INGREDIENT } from '../../services/actions/ingredients';

function BurgerIngredients() {
  const dispatch = useDispatch();

  const catBun = useRef();
  const catSauce = useRef();
  const catMain = useRef();

  const { ingredients, currentIngredient } = useSelector(store => store.ingredients);

  function onTabClickHandler(tab) {
    setCurrent(tab);
    switch (tab) {
      case 'bun':
        catBun.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'sauce':
        catSauce.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'main':
        catMain.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  }

  // TODO: переделать этот ужас
  const onMenuScroll = (e) => {
    const containerTop = e.target.getBoundingClientRect().y;
    const catBunTop = Math.abs(catBun.current.getBoundingClientRect().y - containerTop);
    const catSauceTop = Math.abs(catSauce.current.getBoundingClientRect().y - containerTop);
    const catMainTop = Math.abs(catMain.current.getBoundingClientRect().y - containerTop);
    const min = Math.min(catBunTop, catSauceTop, catMainTop);
    switch(min) {
      case catBunTop:
        setCurrent('bun');
        break;
      case catSauceTop:
        setCurrent('sauce');
        break;
      case catMainTop:
        setCurrent('main');
        break;
      default:
        setCurrent('bun')
    }
  }

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
          <Tab value="bun" active={current === 'bun'} onClick={onTabClickHandler}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={onTabClickHandler}>
            Соус
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={onTabClickHandler}>
            Начинки
          </Tab>
        </div>
        <div className={styles.content} onScroll={onMenuScroll}>
          <h2 className="text text_type_main-medium" ref={catBun}>Булки</h2>
          <BurderIngredientCategory data={ingredients.filter(item => item.type === 'bun')} onIndegrientClick={showIngredient} />
          <h2 className="text text_type_main-medium" ref={catSauce}>Соусы</h2>
          <BurderIngredientCategory data={ingredients.filter(item => item.type === 'sauce')} onIndegrientClick={showIngredient} />
          <h2 className="text text_type_main-medium" ref={catMain}>Начинки</h2>
          <BurderIngredientCategory data={ingredients.filter(item => item.type === 'main')} onIndegrientClick={showIngredient} />
        </div>
      </section>
      {isModalOpened && modal}
    </>
  );
}

export default BurgerIngredients;
