import styles from './burger-ingredient-category.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/prop-types';

function BurderIngredientCategory({ data, onIndegrientClick }) {

  function clickIndegrient(id) {
    onIndegrientClick(id);
  }

  return (
    <ul className={`${styles.ingredient__list} pt-6 pr-4 pb-10 pl-4`}>
      {data.map(item => {
        return (
          <li className={`${styles.ingredient}`} key={item._id}  onClick={() => clickIndegrient(item._id)}>
            <img src={item.image} alt={item.name} className={`${styles.image} mr-4 mb-1 ml-4`} />
            <Counter count={1} size="default" extraClass={styles.counter} />
            <p className={`${styles.price} text text_type_digits-default mb-1`}>{item.price} <CurrencyIcon type="primary" /></p>
            <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
          </li>
        )
      })}
    </ul>
  )
}
BurderIngredientCategory.propType ={
  currentIngredient: ingredientPropTypes().isRequired,
}

export default BurderIngredientCategory;
