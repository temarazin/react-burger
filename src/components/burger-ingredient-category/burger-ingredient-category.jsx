import styles from './burger-ingredient-category.module.css';
import { ingredientPropTypes } from '../../utils/prop-types';
import BurderIngredient from '../burger-ingredient/burger-ingredient';

function BurderIngredientCategory({ data, onIndegrientClick }) {


  return (
    <ul className={`${styles.ingredient__list} pt-6 pr-4 pb-10 pl-4`}>
      {data.map(item => {
        return (
          <BurderIngredient className={`${styles.ingredient}`} key={item._id} item={item}  onIndegrientClick={onIndegrientClick} />
        )
      })}
    </ul>
  )
}
BurderIngredientCategory.propType ={
  currentIngredient: ingredientPropTypes().isRequired,
}

export default BurderIngredientCategory;
