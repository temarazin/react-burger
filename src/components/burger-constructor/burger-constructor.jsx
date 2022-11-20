import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import { ADD_BUN, ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../services/actions/burgerConstructor';

function BurgerConstructor() {

  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store.burgerConstructor);

  const onDropHandler = (item) => {
    if (ingredients[1]?._id === 'placeholder_ingredient') {
      dispatch({ type: REMOVE_INGREDIENT, id: 'placeholder_ingredient' })
    }
    const action = item.type === 'bun' ? ADD_BUN : ADD_INGREDIENT;
    dispatch({ type: action, ingredient: item });
  }

  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
        onDropHandler(item);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
});



  const [isModalOpened, setIsModalOpened] = useState(false);

  const closeModal = () => {
    setIsModalOpened(false);
  }

  const showOrder = () => {
    setIsModalOpened(true);
  }

  const modal = (
    <Modal onClose={closeModal}>
      <OrderDetails />
    </Modal>
  )

  return (
    <>
      <section className="mt-25" aria-label="Конструктор">
        <ul className={`${styles.constructor} ${isHover && styles.isHover} pr-4 pl-4`} ref={dropTarget}>
          {ingredients.map((item, i, ar) => (
            <BurgerConstructorItem
              item={item}
              key={item._id}
              isLocked={i === 0}
              type={i === 0 ? 'top' : undefined}
            />
            )
          )}
          <BurgerConstructorItem
              item={ingredients[0]}
              key={'bottom-bun'}
              isLocked={true}
              type="bottom"
            />
        </ul>
        <div className={`${styles['order-submit']} mt-10`}>
          <p className="text text_type_digits-medium mr-10">3200 <CurrencyIcon type="primary" /></p>
          <Button type="primary" htmlType="button" size="large" onClick={showOrder}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModalOpened && modal}
    </>
  )
}

export default BurgerConstructor;
