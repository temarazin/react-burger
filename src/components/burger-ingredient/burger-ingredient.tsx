import styles from './burger-ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/prop-types';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { useSelector } from '../../services/hooks';
import { RootState, TIngredient } from '../../utils/types';

type TBurderIngredientProps = {
  item: TIngredient
}

function BurderIngredient({ item }: TBurderIngredientProps): JSX.Element {
  const { ingredients } = useSelector((store: RootState) => store.burgerConstructor);
  const location = useLocation();

  let count = useMemo(
    () => ingredients.filter((ingred: TIngredient) => ingred._id === item._id).length,
    [ingredients, item]
  );
  if (item.type === 'bun') {
    count *= 2;
  }

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  return (
    <li className={`${styles.ingredient} ${isDrag && styles.isDragging}`} key={item._id} >
      <Link className={styles.link} to={{
        pathname: `/ingredients/${item._id}`,
        state: { background: location }
      }}>
        <img src={item.image} alt={item.name} className={`${styles.image} mr-4 mb-1 ml-4`} ref={dragRef} />
        {count > 0 && <Counter count={count} size="default" extraClass={styles.counter} />}
        <p className={`${styles.price} text text_type_digits-default mb-1`}>{item.price} <CurrencyIcon type="primary" /></p>
        <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
      </Link>
    </li>
  )
}
BurderIngredient.propType ={
  item: ingredientPropTypes().isRequired,
}

export default BurderIngredient;
