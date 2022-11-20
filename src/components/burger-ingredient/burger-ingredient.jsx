import styles from './burger-ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

function BurderIngredient({ item, onIndegrientClick }) {
  const { ingredients } = useSelector(store => store.burgerConstructor);
  const count = ingredients.filter(ingred => ingred._id === item._id).length;

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
      {count > 0 && <Counter count={count} size="default" extraClass={styles.counter} />}
      <p className={`${styles.price} text text_type_digits-default mb-1`}>{item.price} <CurrencyIcon type="primary" /></p>
      <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
    </li>
  )
}
BurderIngredient.propType ={
  item: ingredientPropTypes().isRequired,
  onIndegrientClick: PropTypes.func.isRequired,
}

export default BurderIngredient;
