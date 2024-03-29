import styles from "./burger-ingredient-category.module.css";
import PropTypes from "prop-types";
import { useInView } from "react-intersection-observer";
import { ingredientPropTypes } from "../../utils/prop-types";
import BurderIngredient from "../burger-ingredient/burger-ingredient";
import { TIngredient, TIngredientCategory } from "../../utils/types";
import { ingredientCategory } from "../../utils/enums";

type TBurderIngredientCategoryProps = {
  data: TIngredient[];
  cat: TIngredientCategory;
  current: ingredientCategory[];
  root: HTMLElement;
  onSetCurrent: (types: ingredientCategory[]) => void;
  onIndegrientClick: (id: string) => void;
};

function BurderIngredientCategory({
  data,
  cat,
  current,
  root,
  onSetCurrent,
  onIndegrientClick,
}: TBurderIngredientCategoryProps): JSX.Element {
  const { type, name } = cat;

  const { ref } = useInView({
    root,
    threshold: 0.2,
    onChange: (inView) => {
      if (inView) {
        onSetCurrent([...current, type]);
      } else {
        onSetCurrent(current.filter((item) => item !== type));
      }
    },
  });

  return (
    <>
      <h2 className="text text_type_main-medium">{name}</h2>
      <ul
        className={`${styles.ingredient__list} pt-6 pr-4 pb-10 pl-4`}
        ref={ref}
      >
        {data.map((item) => {
          return <BurderIngredient key={item._id} item={item} />;
        })}
      </ul>
    </>
  );
}
BurderIngredientCategory.propType = {
  data: PropTypes.arrayOf(ingredientPropTypes()).isRequired,
  current: PropTypes.arrayOf(PropTypes.string).isRequired,
  root: PropTypes.node.isRequired,
  onSetCurrent: PropTypes.func.isRequired,
  onIndegrientClick: PropTypes.func.isRequired,
};

export default BurderIngredientCategory;
