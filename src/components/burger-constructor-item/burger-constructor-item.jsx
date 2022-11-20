import styles from './burger-constructor-item.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { REMOVE_INGREDIENT } from '../../services/actions/burgerConstructor';
import { useDispatch } from 'react-redux';

function BurgerConstructorItem({ item, isLocked = false, type = undefined }) {

  const dispatch = useDispatch();
  const name = item.name + (type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : '');

  const handleRemove = () => {
    dispatch({ type: REMOVE_INGREDIENT, id: item._id });
  }

  return (
    <li className={`${styles.constructor__item}`}>
      <span className={`${styles['icon-wrapper']} pr-2`}>
        {!isLocked && <DragIcon type="primary" />}
      </span>
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={name}
        price={item.price}
        thumbnail={item.image}
        handleClose={handleRemove}
      />
    </li>
  )
}

export default BurgerConstructorItem;
