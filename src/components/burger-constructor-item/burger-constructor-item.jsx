import styles from './burger-constructor-item.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructorItem({ item, isLocked, type }) {
  const name = item.name + (type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : '');

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
      />
    </li>
  )
}

export default BurgerConstructorItem;
