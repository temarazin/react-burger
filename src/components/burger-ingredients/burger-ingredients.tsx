import styles from './burger-ingredients.module.css';

import { useState, useRef} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../services/hooks';

import { ingredientDetailActions } from '../../services/actions/ingredientDetail';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import BurderIngredientCategory from '../burger-ingredient-category/burger-ingredient-category';
import { TIngredient, TIngredientCategory } from '../../utils/types';
import { ingredientCategory } from '../../utils/enums';

type TCategories = TIngredientCategory & {ref: any}

function BurgerIngredients() {

  const {
    setCurrentIngredient,
    unsetCurrentIngredient
  } = ingredientDetailActions;
  const dispatch = useDispatch();

  const containerRef = useRef<HTMLDivElement>(null);

  const categories: TCategories[] = [
    {
      name: 'Булки',
      type: ingredientCategory.bun,
      ref: useRef<HTMLDivElement>(),
    },
    {
      name: 'Соусы',
      type: ingredientCategory.sauce,
      ref: useRef<HTMLDivElement>(),
    },
    {
      name: 'Начинки',
      type: ingredientCategory.main,
      ref: useRef<HTMLDivElement>(),
    },
  ]

  const { ingredients } = useSelector((store: any) => store.ingredients);
  const { currentIngredient } = useSelector((store: any) => store.ingredientDetail)

  function onTabClickHandler(tab: string): void {
    const category = categories.find(item => item.type === tab);
    if (category !== undefined) {
      category.ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const [current, setCurrent] = useState<ingredientCategory[]>([ingredientCategory.bun])

  const hideIngredient = () => {
    dispatch(unsetCurrentIngredient());
  }

  const showIngredient = (id: string) => {
    dispatch(setCurrentIngredient(ingredients.find((item: TIngredient) => item._id === id)))
  }

  const modal = (
    <Modal title="Детали ингредиента" onClose={hideIngredient}>
      <IngredientDetails />
    </Modal>
  )

  return (
    <>
      <section>
        <h1 className='text text_type_main-large mt-5 mb-5'>
          Соберите бургер
        </h1>
        <div className={`${styles.tabs} mb-10`}>
          <Tab value="bun" active={current[current.length - 1] === ingredientCategory.bun} onClick={onTabClickHandler}>
            Булки
          </Tab>
          <Tab value="sauce" active={current[current.length - 1] === ingredientCategory.sauce} onClick={onTabClickHandler}>
            Соус
          </Tab>
          <Tab value="main" active={current[current.length - 1] === ingredientCategory.main} onClick={onTabClickHandler}>
            Начинки
          </Tab>
        </div>
        <div className={styles.content} ref={containerRef}>
          {categories.map((cat, index) => (
            <div ref={cat.ref} key={index}>
              <BurderIngredientCategory
                root={containerRef.current!}
                data={ingredients.filter((item:TIngredient) => item.type === cat.type)}
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
