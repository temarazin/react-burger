import styles from './burger-ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/prop-types';
import { useDrag } from 'react-dnd';

function BurderIngredient({ item, onIndegrientClick }) {

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  return (
    <li className={`${styles.ingredient} ${isDrag && styles.isDragging}`} key={item._id}  onClick={() => onIndegrientClick(item._id)}>
      <img src={item.image} alt={item.name} className={`${styles.image} mr-4 mb-1 ml-4`} ref={dragRef} />
      <Counter count={1} size="default" extraClass={styles.counter} />
      <p className={`${styles.price} text text_type_digits-default mb-1`}>{item.price} <CurrencyIcon type="primary" /></p>
      <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
    </li>
  )
}
BurderIngredient.propType ={
  item: ingredientPropTypes().isRequired,
}

export default BurderIngredient;
