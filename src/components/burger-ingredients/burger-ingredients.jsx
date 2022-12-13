import styles from './burger-ingredients.module.css';

import { useEffect, useState, useRef} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';

import { getIngredients } from '../../services/actions/ingredients';
import { ingredientDetailActions } from '../../services/actionCreators/ingredientDetail';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import BurderIngredientCategory from '../burger-ingredient-category/burger-ingredient-category';

function BurgerIngredients() {

  const {
    setCurrentIngredient,
    unsetCurrentIngredient
  } = ingredientDetailActions;
  const dispatch = useDispatch();

  const containerRef = useRef();

  const categories = [
    {
      name: 'Булки',
      type: 'bun',
      ref: useRef(),
    },
    {
      name: 'Соусы',
      type: 'sauce',
      ref: useRef(),
    },
    {
      name: 'Начинки',
      type: 'main',
      ref: useRef(),
    },
  ]

  const { ingredients } = useSelector(store => store.ingredients);
  const { currentIngredient } = useSelector(store => store.ingredientDetail)

  function onTabClickHandler(tab) {
    categories.find(item => item.type === tab).ref.current.scrollIntoView({ behavior: 'smooth' });
  }

  const [current, setCurrent] = useState(['bun'])

  const hideIngredient = () => {
    dispatch(unsetCurrentIngredient());
  }

  const showIngredient = (id) => {
    dispatch(setCurrentIngredient(ingredients.find(item => item._id === id)))
  }

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  const modal = (
    <Modal title="Детали ингредиента" onClose={hideIngredient}>
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
          <Tab value="bun" active={current[current.length - 1] === 'bun'} onClick={onTabClickHandler}>
            Булки
          </Tab>
          <Tab value="sauce" active={current[current.length - 1] === 'sauce'} onClick={onTabClickHandler}>
            Соус
          </Tab>
          <Tab value="main" active={current[current.length - 1] === 'main'} onClick={onTabClickHandler}>
            Начинки
          </Tab>
        </div>
        <div className={styles.content} ref={containerRef}>
          {categories.map((cat, index) => (
            <div ref={cat.ref} key={index}>
              <BurderIngredientCategory
                root={containerRef.current}
                data={ingredients.filter((item) => item.type === cat.type)}
                cat={{ name: cat.name, type: cat.type }}
                current={current}
                onIndegrientClick={showIngredient}
                onSetCurrent={setCurrent}
              />
            </div>
          ))}
        </div>
      </section>
      {currentIngredient !== null && modal}
    </>
  );
}

export default BurgerIngredients;
