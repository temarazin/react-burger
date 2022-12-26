import styles from "./burger-constructor-item.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/prop-types";
import { burgerConstructorActions } from "../../services/actionCreators/burgerConstructor";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { TIngredient } from "../../utils/types";

type TBurgerConsctructorItemProps = {
  item: TIngredient,
  isLocked: boolean,
  type: "top" | "bottom" | undefined
}

function BurgerConstructorItem({ item, isLocked = false, type = undefined }:TBurgerConsctructorItemProps) {
  const { removeIngredient, moveIngredient } = burgerConstructorActions;
  const dispatch = useDispatch();
  const name =
    item.name +
    (type === "top" ? " (верх)" : type === "bottom" ? " (низ)" : "");

  const onDropHandler = (draggedItem:TIngredient) => {
    if (draggedItem.uuid === item.uuid) {
      return;
    }
    dispatch(moveIngredient(draggedItem.uuid, item.uuid));
  };

  const [{ isDrag }, dragRef] = useDrag({
    type: "sortIngredient",
    item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [{ isHover }, dropTarget] = useDrop({
    accept: "sortIngredient",
    drop(item:TIngredient) {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const handleRemove = () => {
    dispatch(removeIngredient(item.uuid));
  };

  return (
    <li
      className={`${styles.constructor__item} ${isDrag ? styles.isDrag : ""} ${
        isHover ? styles.isHover : ""
      }`}
      {...(item.type !== "bun" && { ref: dragRef })}
    >
      <span className={`${styles["icon-wrapper"]} pr-2`}>
        {!isLocked && <DragIcon type="primary" />}
      </span>
      <div
        {...(type !== "bottom" && { ref: dropTarget })}
        style={{ width: "100%" }}
      >
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={name}
          price={item.price}
          thumbnail={item.image}
          handleClose={handleRemove}
        />
      </div>
    </li>
  );
}
BurgerConstructorItem.propType = {
  item: ingredientPropTypes().isRequired,
  isLocked: PropTypes.bool,
  type: PropTypes.string,
};

export default BurgerConstructorItem;
