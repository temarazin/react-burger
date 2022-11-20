import styles from './burger-constructor-item.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';
import { REMOVE_INGREDIENT, MOVE_INGREDIENT } from '../../services/actions/burgerConstructor';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

function BurgerConstructorItem({ item, isLocked = false, type = undefined }) {

  const dispatch = useDispatch();
  const name = item.name + (type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : '');

  const onDropHandler = (draggedItem) => {
    if (draggedItem.uuid === item.uuid) {
      return;
    }
    dispatch({
      type: MOVE_INGREDIENT,
      itemUuid: draggedItem.uuid,
      pasteAfterItemUuid: item.uuid
    });
  }

  const [{ isDrag }, dragRef] = useDrag({
    type: 'sortIngredient',
    item,
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    })
  })

  const [{ isHover }, dropTarget] = useDrop({
    accept: "sortIngredient",
    drop(item) {
        onDropHandler(item);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  });

  const handleRemove = () => {
    dispatch({ type: REMOVE_INGREDIENT, uuid: item.uuid });
  }

  return (
    <li className={`${styles.constructor__item} ${isDrag ? styles.isDrag : ''} ${isHover ? styles.isHover : ''}`} {...(item.type !== 'bun' && {ref: dragRef})}>
      <span className={`${styles['icon-wrapper']} pr-2`}>
        {!isLocked && <DragIcon type="primary" />}
      </span>
      <div {...(type !== 'bottom' && {ref: dropTarget})} style={{width: '100%'}}>
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
  )
}
BurgerConstructorItem.propType ={
  item: ingredientPropTypes().isRequired,
  isLocked: PropTypes.bool,
  type: PropTypes.string
}

export default BurgerConstructorItem;
