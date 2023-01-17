import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import Loader from '../loader/loader';
import { TIngredient } from '../../utils/types';

interface IIngredientDetailsParams {
  ingredientId: string;
}

function IngredientDetails(): JSX.Element {
  const { ingredientId } = useParams<IIngredientDetailsParams>();
  const { ingredients, request } = useSelector((store:any) => store.ingredients);
  let currentIngredient = ingredients.find((item: TIngredient) => item._id === ingredientId)
  if (!currentIngredient) {
    return (
      request
        ? ( <Loader />)
        : ( <p className='text'>Не найден</p>)
      )
  }
  const {
    name,
    proteins,
    fat,
    carbohydrates,
    calories,
    image_large
  } = currentIngredient;
  return (
    <div>
      <img src={image_large} alt={name} className={`${styles.image}`} />
      <h4 className={`${styles.name} text text_type_main-medium mt-4`}>{name}</h4>
      <ul className={`${styles.elements} mt-8`}>
        <li>
          <p className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{calories}</p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive mb-2">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{proteins}</p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive mb-2">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{fat}</p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
